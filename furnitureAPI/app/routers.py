from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.services import verify_password, create_access_token, hash_password, get_current_user
from app.db import get_db, Session
from app import models, schemas
from datetime import timedelta
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES

user_router = APIRouter()

# Endpoint do rejestracji użytkownika
@user_router.post("/user")
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_users = models.Users(username=user.username, email=user.email, password=hash_password(user.password))
    db.add(db_users)
    db.commit()
    db.refresh(db_users)
    return db_users

# Endpoint do logowania użytkownika
@user_router.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    """ Endpoint logowania """
    user = db.query(models.Users).filter(models.Users.email == form_data.username).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Nie ma uzytkownika")
    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Nieprawidłowe dane logowania")
    
    access_token = create_access_token({"sub": user.email}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
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

@user_router.get("/protected-endpoint")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": f"Hello {current_user}"}