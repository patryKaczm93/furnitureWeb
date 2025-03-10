from pydantic import BaseModel, EmailStr
from typing import List, Annotated, Optional

#Dodawanie użytkownika (dane wejściowe)
class UserCreate(BaseModel):
    username: str
    password: str
    verify_password: str
    email: EmailStr
    firstname: Optional[str] = None
    lastname: Optional[str] = None

    class Config:
        orm_mode = True

#Odczytywanie danych o użytkowniku
class UserOut(BaseModel):
    id: int
    username: str
    email: str

class Token(BaseModel):
    username: str
    password: str
