from sqlalchemy.orm import Session
from app.services import hash_password
from app.models import Users, UsersRole
from app.config import settings
from passlib.context import CryptContext

def create_admin_user(db: Session):
    admin_user = db.query(Users).filter(Users.email == settings.ADMIN_EMAIL).first()
    
    if not admin_user:
        hashed_password = hash_password(settings.ADMIN_PASSWORD)
        admin_user = Users(
            email=settings.ADMIN_EMAIL,
            username=settings.ADMIN_USERNAME,
            password=hashed_password,
            firstname="Admin",
            lastname="User",
            role=UsersRole.ADMIN
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)

