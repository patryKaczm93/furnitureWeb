from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, Query
from app import models, schemas
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Users
from app.services import send_verification_mail, get_hash_password
import secrets
from app.exceptions import raise_not_found_exception, raise_bad_request_exception

router = APIRouter(tags=["password"])

@router.post("/forgot_password/")
def forgot_password(email: str, db: Session = Depends(get_db)):
    """Generate reset token and send password reset email."""
    user = db.query(Users).filter(Users.email == email).first()
    if not user:
        raise_not_found_exception("User not found")
    
    reset_token = secrets.token_urlsafe(32)
    token_expires = datetime.now(timezone.utc) + timedelta(hours=24)

    user.reset_password_token = reset_token
    user.reset_password_expires = token_expires
    db.commit()

    send_verification_mail(user.email, reset_token, "reset_forgotten_password")

    return {"msg": "A password reset link has been sent to the provided email address."}

@router.get("/reset_forgotten_password")
async def validate_reset_token(token: str = Query(...), db: Session = Depends(get_db)):
    """Validate password reset token."""
    user_db = db.query(models.Users).filter(models.Users.reset_password_token == token).first()

    if not user_db or user_db.reset_password_expires.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
        raise_bad_request_exception("Invalid or expired token.")
    
    return {"msg": "Token is valid. You can now set a new password."}

@router.post("/reset_forgotten_password")
async def reset_password(data: schemas.ResetPassword, token: str = Query(...), db: Session = Depends(get_db)):
    """Reset user password using valid reset token."""
    user_db = db.query(models.Users).filter(models.Users.reset_password_token == token).first()

    if not user_db or user_db.reset_password_expires.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
        raise_bad_request_exception("Invalid or expired token.")

    user_db.password = get_hash_password(data.password)
    user_db.reset_password_token = None
    user_db.reset_password_expires = None
    db.commit()
    
    return {"msg": "Password has been successfully changed."}
