import secrets
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, Depends
from app.services import verify_token, get_hash_password, send_verification_mail, get_current_user, get_user_by_username
from app.database import get_db, Session
from app import models, schemas
from app.config import settings
from app.exceptions import raise_conflict_exception, raise_not_found_exception

router = APIRouter(tags=["users"])

@router.post("/registration")
async def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user with email verification."""
    existing_user = get_user_by_username(db, username=user.username)
    
    if existing_user:
        raise_conflict_exception("User with this username already exists")

    verification_token = secrets.token_urlsafe(32)
    token_expires = datetime.now(timezone.utc) + timedelta(hours=24)

    new_user = models.Users(
        username=user.username, 
        password=get_hash_password(user.password),
        email=user.email,
        firstname=user.firstname or "",
        lastname=user.lastname or "",
        role=models.UsersRole.USER,
        verification_token=verification_token,
        verification_token_expires=token_expires
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    print(f"Sending email to {new_user.email} with token {new_user.verification_token}")

    send_verification_mail(new_user.email, verification_token, "verify")

    return {
        "msg": "User has been successfully registered. Please check your email to verify your account.",
        "username": new_user.username
    }


@router.get("/user/{user_id}", status_code=200)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """Fetch user details by user ID."""
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if db_user is None:
        raise_not_found_exception("User does not exist")

    return {
        "id": db_user.id,
        "username": db_user.username,
        "email": db_user.email,
        "firstname": db_user.firstname,
        "lastname": db_user.lastname,
        "role": str(db_user.role)
    }


@router.delete("/user/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete user by user ID."""
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if db_user is None:
        raise_not_found_exception("User does not exist")
    db.delete(db_user)
    db.commit()

    return {
        "msg": "User deleted successfully"
    }

@router.get("/all-users")
async def get_all_users(db: Session = Depends(get_db)):
    """Retrieve all users."""
    users = db.query(models.Users).all()
    return users

@router.patch("/user/{user_id}")
async def update_user(user_id: int, user_data: schemas.UserUpdate, db: Session = Depends(get_db)):
    """Update user data partially."""
    user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if not user:
        raise_not_found_exception("User does not exist")

    for key, value in user_data.dict(exclude_unset=True).items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)

    return user
