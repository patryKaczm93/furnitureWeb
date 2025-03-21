from fastapi import APIRouter, File, UploadFile, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import UserProjectImages, Users, OrderStatusEnum
from app.config import settings
from app.schemas import ImageCreate, ImageOut 
import os
from uuid import uuid4

router = APIRouter(tags=["images"])

def save_file(file: UploadFile):
    extension = file.filename.split('.')[-1]
    file_name = f"{uuid4()}.{extension}"

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    upload_dir = os.path.join(BASE_DIR, settings.UPLOAD_FOLDER)

    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, file_name)

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    
    return os.path.join(settings.UPLOAD_FOLDER, file_name)

@router.post("/upload_image/")
async def upload_image(user_id: int, description: str = Form(None), order_status: OrderStatusEnum = Form(OrderStatusEnum.NEW), file: UploadFile = File(...), db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Użytkownik nie znaleziony")

    file_path = save_file(file)

    new_image = UserProjectImages(
        user_id=user_id,
        image_path=file_path,
        description=description,
        order_status=order_status
    )

    db.add(new_image)
    db.commit()
    db.refresh(new_image)

    return {
        "msg": "Image has been successfully uploaded",
        "image": ImageOut.from_orm(new_image)
        }
    


@router.get("/get_user_images/{user_id}")
def get_images(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Użytkownik nie znaleziony")

    images = db.query(UserProjectImages).filter(UserProjectImages.user_id == user_id).all()

    return {
        "msg": "User's projects fetched successfully",
        "user_id": user_id,
        "projects": [ImageOut.from_orm(image) for image in images]
    }

@router.delete("/delete_image/{image_id}")
def delete_image(image_id: int, db: Session = Depends(get_db)):
    image = db.query(UserProjectImages).filter(UserProjectImages.id == image_id).first()

    if not image:
        raise HTTPException(status_code=404, detail="Zdjęcie nie znalezione")

    # os.remove(image.image_path)
    db.delete(image)
    db.commit()

    return {
        "msg": "Photo deleted successfully",
        "image_id": image_id 
    }

@router.put("/update_image/{image_id}")
def update_image(image_id: int, image_data: ImageCreate = None, order_status: OrderStatusEnum = None, db: Session = Depends(get_db)):

    image = db.query(UserProjectImages).filter(UserProjectImages.id == image_id).first()

    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    if image_data.description is not None:
        image.description = image_data.description
    if image_data.order_status is not None:
        image.order_status = image_data.order_status


    db.commit()
    db.refresh(image)

    return {
        "msg": "Image has been successfully updated",
        "image": ImageOut.from_orm(image)
    }