import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models import Users, UsersRole

def test_user_login(db_session):
    # Dodaj usera
    user = Users(
        email="test@example.com",
        username="testuser",
        password="hashedpass",
        firstname="Test",
        lastname="User",
        role=UsersRole.USER
    )
    db_session.add(user)
    db_session.commit()
    
    # Pobierz usera z bazy i sprawdź, czy się zapisał
    db_user = db_session.query(Users).filter_by(username="testuser").first()
    assert db_user is not None
    assert db_user.email == "test@example.com"
    assert db_user.role == UsersRole.USER