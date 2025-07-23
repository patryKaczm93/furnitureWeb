import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models import Users

@pytest.fixture(scope='function')
def db_session():
    # baza SQLite w pamięci do testów
    engine = create_engine('sqlite:///:memory:', connect_args={"check_same_thread": False})
    Base.metadata.create_all(bind=engine)  # tworzymy tabele przed testem
    
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()
