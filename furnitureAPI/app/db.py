from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

DATABASE_URL = "postgresql://postgres:iaFCEbtgZSUHxeFtBQZfBMmvHVrzgeza@switchyard.proxy.rlwy.net:32834/railway"

engine = create_engine(DATABASE_URL)
Sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = Sessionlocal()
    try:
        yield db
    finally:
        db.close()
