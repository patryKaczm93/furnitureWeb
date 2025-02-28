from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app import models, schemas
from .db import engine, Session, get_db
from app import db
from typing import Annotated

app = FastAPI()

#test

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Zezwól na dostęp z dowolnych źródeł (w produkcji możesz tu podać konkretne adresy)
    allow_credentials=True,
    allow_methods=["*"],  # Zezwól na wszystkie metody (GET, POST, itd.)
    allow_headers=["*"],  # Zezwól na wszystkie nagłówki
)

models.Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.post("/user")
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_users = models.Users(username = user.username, email = user.email, password = user.password)
    db.add(db_users)
    db.commit()
    db.refresh(db_users)
    return db_users

@app.get("/user/{user_id}", response_model=schemas.UserOut)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user