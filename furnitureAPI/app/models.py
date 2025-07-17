import enum
from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from .database import Base

class UsersRole(enum.Enum):
    USER = 'user'
    ADMIN = 'admin'

class OrderStatusEnum(str, enum.Enum):
    NEW = "new"
    ACCEPTED = "accepted"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    REJECTED = "rejected"

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)  # User email, must be unique
    username = Column(String, unique=True, nullable=False)  # Username, unique identifier
    password = Column(String, nullable=False)  # Hashed password
    firstname = Column(String, nullable=False)  # User's first name
    lastname = Column(String, nullable=False)  # User's last name
    role = Column(Enum(UsersRole), default=UsersRole.USER, nullable=False)  # User role, default is USER
    is_verified = Column(Boolean, default=False, nullable=False)  # Verification status
    verification_token = Column(String, unique=True, nullable=True)  # Token used for email verification
    verification_token_expires = Column(DateTime, nullable=True)  # Expiry date of verification token
    reset_password_token = Column(String, unique=True, nullable=True)  # Token for password reset
    reset_password_expires = Column(DateTime, nullable=True)  # Expiry date of reset token

class UserProjectImages(Base):
    __tablename__ = "user_project_images"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)  # Foreign key to user
    image_path = Column(String, nullable=False)  # Path to the project image
    description = Column(String, nullable=True)  # Optional description of the image/project
    order_status = Column(Enum(OrderStatusEnum), default=OrderStatusEnum.NEW)  # Status of the order
    created_at = Column(DateTime, default=datetime.now(timezone.utc))  # Timestamp when image was created

    # Relationship to Users table, enabling access to the user from project images
    user = relationship("Users", backref="project_images")

class UserProjectImagesDone(Base):
    __tablename__ = "user_project_images_done"

    id = Column(Integer, primary_key=True)
    done_image_path = Column(String, nullable=False)  # Path to the completed project image
