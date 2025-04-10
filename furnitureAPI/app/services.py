from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
from email.message import EmailMessage
import smtplib

from app import models
from .database import get_db
from .config import settings


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

def get_user_by_username(db: Session, username: str):
    return db.query(models.Users).filter(models.Users == username).first()

def get_hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def verify_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError as e:
        return None

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Nieprawidłowe dane logowania")

    print(f"Token received: {token}") 

    payload = verify_token(token)
    print(f"Payload: {payload}")  

    if payload is None:
        raise credentials_exception

    username: str = payload.get("sub")
    print(f"Extracted username: {username}") 

    if username is None:
        raise credentials_exception

    user = db.query(models.Users).filter(models.Users.username == username).first()
    print(f"User found: {user}") 

    if user is None:
        raise credentials_exception

    return user


def send_verification_mail(email: str, token: str, your_endpoint: str):
    verification_link = f"{settings.FRONTEND_URL}/{your_endpoint}?token={token}"

    msg = EmailMessage()
    msg['Subject'] = 'Aktywacja konta'
    msg['From'] = settings.SMTP_USER or "noreply@example.com"
    msg['To'] = email
    msg.set_content(f'Kliknij w link, aby aktywować konto: {verification_link}')

    try:
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            if settings.SMTP_USER and settings.SMTP_PASSWORD:
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)

            server.send_message(msg)
        print("Email wysłany pomyślnie!")
    except Exception as e:
        print(f"Error sending email: {e}")