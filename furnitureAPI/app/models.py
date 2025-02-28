from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from .db import Base

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index = True)
    email = Column(String, index = True)
    password = Column(String, index = True)