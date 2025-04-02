from fastapi import APIRouter, File, UploadFile, Depends, HTTPException, Form, Body
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import UserProjectImages, Users, OrderStatusEnum, UserProjectImagesDone
from app.config import settings
from app.schemas import ImageCreate, ImageOut, ShowPathDoneImage
import os
from uuid import uuid4

router = APIRouter(tags=["images"])

def save_file(file: UploadFile, upload_path: str = settings.UPLOAD_FOLDER) -> str:
    extension = file.filename.split('.')[-1]
    file_name = f"{uuid4()}.{extension}"

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    upload_dir = os.path.join(BASE_DIR, upload_path)

    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, file_name)

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    
    return os.path.join(upload_path, file_name)

def delete_image_file(file_path: str):

    full_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), file_path)
    if os.path.exists(full_path):
        try:
            os.remove(full_path)
            print(f"File {full_path} deleted successfully")
        except Exception as e:
            print(f"Error deleting file {full_path}, {e}")
    else:
        print(f"File {full_path} does not exist")

@router.post("/upload_image/")
async def upload_image(user_id: int = Form(...), description: str = Form(None), order_status: OrderStatusEnum = Form(OrderStatusEnum.NEW), file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file:
        raise HTTPException(status_code=400, detail="File not uploaded properly")
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
    
    delete_image_file(image.image_path)

    db.delete(image)
    db.commit()

    return {
        "msg": "Photo deleted successfully",
        "image_id": image_id 
    }

@router.put("/update_image/{image_id}", response_model=ImageOut)
def update_image(
    image_id: int, 
    image_data: ImageCreate = Body(...),
    db: Session = Depends(get_db)
):
    image = db.query(UserProjectImages).filter(UserProjectImages.id == image_id).first()

    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    if image_data.description is not None:
        image.description = image_data.description
    if image_data.order_status is not None:
        image.order_status = image_data.order_status

    db.commit()
    db.refresh(image)

    return image

@router.post("/upload_done_project/", response_model=ShowPathDoneImage)
def upload_done_project(file: UploadFile = File(...), db: Session = Depends(get_db)):
    path = settings.UPLOAD_DONE_PROJECTS
    done_image_path = save_file(file, path)

    new_done_image = UserProjectImagesDone(done_image_path=done_image_path)

    db.add(new_done_image)
    db.commit()
    db.refresh(new_done_image)

    return ShowPathDoneImage(id=new_done_image.id, done_image_path=new_done_image.done_image_path)

@router.delete("/delete_done_image/{image_id}")
def delete_done_image(image_id: int, db: Session = Depends(get_db)):
    image = db.query(UserProjectImagesDone).filter(UserProjectImagesDone.id == image_id).first()

    if not image:
        raise HTTPException(status_code=404, detail="Zdjęcie nie znalezione")
    
    delete_image_file(image.done_image_path)

    db.delete(image)
    db.commit()

    return {
        "msg": "Photo deleted successfully",
        "image_id": image_id 
    }

@router.get("/get_done_image/{image_id}")
def get_done_image(image_id: int, db: Session = Depends(get_db)):
    image = db.query(UserProjectImagesDone).filter(UserProjectImagesDone.id == image_id).first()

    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    return {"id": image.id, "done_image_path": image.done_image_path}

@router.get("/get_done_images/")
def get_done_images(db: Session = Depends(get_db)):
    images = db.query(UserProjectImagesDone).all()
    return [{"id": image.id, "done_image_path": image.done_image_path} for image in images]