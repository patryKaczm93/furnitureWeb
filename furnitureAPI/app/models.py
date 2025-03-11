import enum
from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from .database import Base

class UsersRole(enum.Enum):
    USER = 'user'
    ADMIN = 'admin'

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    role = Column(Enum(UsersRole), default=UsersRole.USER, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    verification_token = Column(String, unique=True, nullable=True)
    verification_token_expires = Column(DateTime, nullable=True)
    reset_password_token = Column(String, unique=True, nullable=True)
    reset_password_expires = Column(DateTime, nullable=True)

class UserProjectImages(Base):
    __tablename__ = "user_project_images"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    image_path = Column(String, nullable=False)
    description = Column(String, nullable=True) 
    created_at = Column(DateTime, default=datetime.now(timezone.utc)) 

    user = relationship("Users", backref="project_images")