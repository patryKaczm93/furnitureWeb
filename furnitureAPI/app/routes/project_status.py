from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import UserProjectImages, OrderStatusEnum
from app.schemas import ImageOut

router = APIRouter(tags=["projects_status"])

@router.get("/projects", response_model=List[ImageOut])
def search_projects(
    user_id: int,
    db: Session = Depends(get_db),
):
    db_projects = db.query(UserProjectImages).filter(UserProjectImages.user_id == user_id).all()

    if not db_projects:
        raise HTTPException(status_code=404, detail="Nie znaleziono projektów dla użytkownika")
    
    return [ImageOut.model_validate(img) for img in db_projects]