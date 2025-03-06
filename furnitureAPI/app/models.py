import enum
from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime
from sqlalchemy.sql import func
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
    email_verification_token = Column(String, nullable=True)  # Token do potwierdzenia e-maila
    reset_token = Column(String, nullable=True)  # Token do resetu hasła

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())