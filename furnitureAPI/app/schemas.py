from pydantic import BaseModel
from typing import List, Annotated

#Dodawanie użytkownika (dane wejściowe)
class UserCreate(BaseModel):
    username: str
    password: str

#Odczytywanie danych o użytkowniku
class UserOut(BaseModel):
    id: int
    username: str
    email: str

