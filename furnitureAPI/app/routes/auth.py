import jwt
from fastapi import APIRouter, Depends, HTTPException

from app import models, schemas
from app.database import get_db
from app.services import verify_password, create_access_token
from app.config import settings
from datetime import timedelta

router = APIRouter(tags=["auth"])

@router.post("/token")
def login_for_access_token(user: schemas.UserCreate, db=Depends(get_db)):
    """ Endpoint logowania """
    user_db = db.query(models.Users).filter(models.Users.username == user.username).first()
    if user_db is None:
        raise HTTPException(status_code=401, detail="Nie ma takiego użytkownika")
    if not verify_password(user.password, user_db.password):
        raise HTTPException(status_code=401, detail="Nieprawidłowe dane logowania")
    
    access_token = create_access_token({"sub": user_db.username}, timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}