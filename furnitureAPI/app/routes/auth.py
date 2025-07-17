from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.services import verify_password, create_access_token, verify_token, oauth2_scheme
from app.config import settings
from app.exceptions import raise_unauthorized_exception, raise_bad_request_exception


router = APIRouter(tags=["auth"])

@router.post("/token")
def login_for_access_token(user: schemas.Token, db=Depends(get_db)):
    """Login endpoint: validate user and return access token."""
    user_db = db.query(models.Users).filter(models.Users.username == user.username).first()
    if user_db is None:
        raise_unauthorized_exception("User not found")
    if not verify_password(user.password, user_db.password):
        raise_unauthorized_exception("Invalid login credentials")
    
    access_token = create_access_token({"sub": user_db.username}, timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/verify", tags=["auth"])
async def verify_account(token: str = Query(...), db: Session = Depends(get_db)):
    """Verify account using the verification token."""
    user = db.query(models.Users).filter(models.Users.verification_token == token).first()

    if not user:
        raise_bad_request_exception("Invalid verification token.")
    if user.is_verified:
        return {"msg": "Account already activated."}
    if user.verification_token_expires.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
        raise_bad_request_exception("Token expired. Please register again.")

    user.is_verified = True
    user.verification_token = None
    user.verification_token_expires = None
    db.commit()

    return {"msg": "Account successfully activated."}


@router.get("/verified-token")
async def verified_user_token(token: str = Depends(oauth2_scheme), db=Depends(get_db)):
    """Validate bearer token and return the authenticated user."""
    if not token:
        raise_bad_request_exception("Token missing")
    
    try:
        payload = verify_token(token)
        username: str = payload.get("sub")
        if not username:
            raise_unauthorized_exception("Invalid token payload")
        
        user = db.query(models.Users).filter(models.Users.username == username).first()
        if not user:
            raise_unauthorized_exception("User not found")

    except Exception:
        raise_unauthorized_exception("Invalid token")

    return user
