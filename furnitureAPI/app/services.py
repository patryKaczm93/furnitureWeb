from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
from email.message import EmailMessage
import smtplib
from app.exceptions import raise_unauthorized_exception

from app import models
from .database import get_db
from .config import settings


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

def get_user_by_username(db: Session, username: str):
    """Retrieve a user by username from the database."""
    return db.query(models.Users).filter(models.Users.username == username).first()

def get_hash_password(password: str) -> str:
    """Hash a plaintext password."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify that a plaintext password matches the hashed password."""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    """Create a JWT access token with an expiration."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def verify_token(token: str):
    """Verify a JWT token and decode its payload."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Retrieve the current user based on the JWT token."""
    print(f"Token received: {token}") 

    payload = verify_token(token)
    print(f"Payload: {payload}")  

    if payload is None:
        raise_unauthorized_exception("Invalid login credentials")

    username: str = payload.get("sub")
    print(f"Extracted username: {username}") 

    if username is None:
        raise_unauthorized_exception("Invalid login credentials")

    user = db.query(models.Users).filter(models.Users.username == username).first()
    print(f"User found: {user}") 

    if user is None:
        raise_unauthorized_exception("Invalid login credentials")

    return user


def send_verification_mail(email: str, token: str, your_endpoint: str):
    """Send an account verification email with a tokenized link."""
    verification_link = f"{settings.FRONTEND_URL}/{your_endpoint}?token={token}"

    msg = EmailMessage()
    msg['Subject'] = 'Account Activation'
    msg['From'] = settings.SMTP_USER or "noreply@example.com"
    msg['To'] = email
    msg.set_content(f'Click the link to activate your account: {verification_link}')

    try:
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            if settings.SMTP_USER and settings.SMTP_PASSWORD:
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)

            server.send_message(msg)
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")
