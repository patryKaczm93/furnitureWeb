from pydantic import BaseModel, EmailStr, validator
from typing import List, Annotated, Optional
from datetime import datetime
from .models import OrderStatusEnum

class UserCreate(BaseModel):
    username: str
    password: str
    verify_password: str
    email: EmailStr
    firstname: Optional[str] = None
    lastname: Optional[str] = None

    class Config:
        from_attributes=True
        orm_mode = True
class UserOut(BaseModel):
    id: int
    username: str
    email: str

class Token(BaseModel):
    username: str
    password: str

class ResetPassword(BaseModel):
    password: str
    verify_password: str

    @validator("verify_password")
    def passwords_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError("Hasła nie są takie same")
        return v

class ImageCreate(BaseModel):
    description: Optional[str] = None
    order_status: OrderStatusEnum = OrderStatusEnum.NEW

    class Config:
        from_attributes=True
        orm_mode = True

class ImageOut(BaseModel):
    id: int
    user_id: int
    description: Optional[str]
    order_status: OrderStatusEnum
    image_path: str
    created_at: datetime

    class Config:
        from_attributes=True
        orm_mode = True