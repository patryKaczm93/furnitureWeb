from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

SQLALCHEMY_DATABASE_URL = os.getenv('DATABASE_URL')
print(SQLALCHEMY_DATABASE_URL)

# engine = create_engine(SQLALCHEMY_DATABASE_URL)
# sessionlocal = sessionmaker(autocmit=False, autoflush=False, bind=engine)

# Base = declarative_base()

# def get_db():
#     print(__dict__.SQLALCHEMY_DATABASE_URL)
#     db = sessionlocal()
#     try:
#         yield db
#     finally:
#         db.close()