from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.services import verify_password, create_access_token, hash_password, verify_token
from app.db import get_db, Session
from app import models, schemas
from datetime import timedelta
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES

user_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

# Endpoint do rejestracji użytkownika
@user_router.post("/user")
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_users = models.Users(username=user.username, email=user.email, password=hash_password(user.password))
    db.add(db_users)
    db.commit()
    db.refresh(db_users)
    return db_users

@user_router.post("/token")
def login_for_access_token(user: schemas.UserCreate, db=Depends(get_db)):
    """ Endpoint logowania """
    user_db = db.query(models.Users).filter(models.Users.username == user.username).first()
    if user_db is None:
        raise HTTPException(status_code=401, detail="Nie ma uzytkownika")
    if not verify_password(user.password, user_db.password):
        raise HTTPException(status_code=401, detail="Nieprawidłowe dane logowania")
    
    access_token = create_access_token({"sub": user_db.username}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

# Endpoint do pobierania użytkownika
@user_router.get("/user/{user_id}", response_model=schemas.UserOut)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Endpoint do usuwania użytkownika
@user_router.delete("/user/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}

@user_router.get("/verified-token")
async def veryfied_user_token(token: str = Depends(oauth2_scheme)):
    verify_token(token)
    return {'message': "Token is valid"}
