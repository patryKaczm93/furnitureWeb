from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from jose import JWTError, jwt
from .config import SECRET_KEY, ALGORITHM
from passlib.context import CryptContext
from app import models

# Ustawienia dla JWT
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/token")

def hash_password(password: str) -> str:
    """ Hashuje hasło za pomocą bcrypt """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """ Sprawdza, czy podane hasło zgadza się z zapisanym hashem """
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    """ Tworzy token JWT """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str):
    """ Weryfikuje token JWT """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
def get_current_user(token: str = Depends(oauth2_scheme)):
    """ Weryfikuje użytkownika na podstawie tokenu JWT """
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Nieautoryzowany")
    return payload  # Możesz zwrócić np. e-mail użytkownika lub ID