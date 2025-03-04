import enum
from sqlalchemy import Boolean, Column, Integer, String, Enum
from app.db import Base

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