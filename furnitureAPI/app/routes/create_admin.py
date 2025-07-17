from sqlalchemy.orm import Session
from app.services import get_hash_password
from app.models import Users, UsersRole
from app.config import settings

def create_admin_user(db: Session):
    """Create an admin user if not already existing."""
    admin_user = db.query(Users).filter(Users.email == settings.ADMIN_EMAIL).first()
    
    if not admin_user:
        hashed_password = get_hash_password(settings.ADMIN_PASSWORD)
        admin_user = Users(
            email=settings.ADMIN_EMAIL,
            username=settings.ADMIN_USERNAME,
            password=hashed_password,
            firstname="Admin",
            lastname="User",
            role=UsersRole.ADMIN,
            is_verified=True
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
