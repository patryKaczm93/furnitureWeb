import secrets
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from app.services import verify_token, get_hash_password, send_verification_mail
from app.database import get_db, Session
from app.services import get_current_user
from app import models, schemas
from datetime import timedelta
from app.config import settings
from app.exceptions import raise_conflict_exception, raise_not_found_exception

router = APIRouter(tags=["users"])

@router.post("/registration")
async def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.Users).filter(models.Users.username == user.username).first()
    
    if existing_user:
        raise_conflict_exception("Użytkownik o podanej nazwie już istnieje")

    verification_token = secrets.token_urlsafe(32)
    token_expires = datetime.now(timezone.utc) + timedelta(hours=24)

    new_user = models.Users(username=user.username, 
                            password=get_hash_password(user.password),
                            email=user.email,
                            firstname=user.firstname or "",
                            lastname=user.lastname or "",
                            role=models.UsersRole.USER,
                            verification_token=verification_token,
                            verification_token_expires=token_expires)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    print(f"Wysyłanie e-maila na adres {new_user.email} z tokenem {new_user.verification_token}")

    send_verification_mail(new_user.email, verification_token)

    return new_user


@router.get("/user/{user_id}", status_code=200)
async def get_user(user_id: int, db: Session = Depends(get_db), current_user: models.Users = Depends(get_current_user)):
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if db_user is None:
        raise_not_found_exception("Użytkownik nie istnieje")
    return db_user


@router.delete("/user/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()

    return {"message": "User deleted successfully"}
