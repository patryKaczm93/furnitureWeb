import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app import models, schemas
from app.database import get_db
from app.services import verify_password, create_access_token, verify_token
from app.config import settings
from datetime import timedelta

router = APIRouter(tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/token")
def login_for_access_token(user: schemas.Token, db=Depends(get_db)):
    """ Endpoint logowania """
    user_db = db.query(models.Users).filter(models.Users.username == user.username).first()
    if user_db is None:
        raise HTTPException(status_code=401, detail="Nie ma takiego użytkownika")
    if not verify_password(user.password, user_db.password):
        raise HTTPException(status_code=401, detail="Nieprawidłowe dane logowania")
    
    access_token = create_access_token({"sub": user_db.username}, timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/verified-token")
async def verified_user_token(token: str = Depends(oauth2_scheme), db=Depends(get_db)):
    if not token:
        raise HTTPException(status_code=400, detail="Token missing")
    
    try:
        payload = verify_token(token)
        username: str = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        
        user = db.query(models.Users).filter(models.Users.username == username).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")

    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {'message': "Token is valid"}