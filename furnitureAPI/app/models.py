import enum
from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime
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