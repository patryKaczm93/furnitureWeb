from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import UserProjectImages, Users
from app.config import settings
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
async def upload_image(user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Użytkownik nie znaleziony")

    file_path = save_file(file)

    new_image = UserProjectImages(user_id=user_id, image_path=file_path)
    db.add(new_image)
    db.commit()

    return {"msg": "Zdjęcie zostało pomyślnie dodane", "image_path": file_path}


@router.get("/get_images/{user_id}")
def get_images(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Użytkownik nie znaleziony")

    images = db.query(UserProjectImages).filter(UserProjectImages.user_id == user_id).all()

    image_urls = [f"/{image.image_path}" for image in images] 

    return {"images": image_urls}
