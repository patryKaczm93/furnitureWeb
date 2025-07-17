from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import UserProjectImages, Users
from app.schemas import ImageOut
from app.exceptions import raise_not_found_exception

router = APIRouter(tags=["projects_status"])

@router.get("/projects", response_model=List[ImageOut])
def search_projects(
    user_id: int,
    db: Session = Depends(get_db),
):
    """Fetch projects for a specific user."""
    db_projects = db.query(UserProjectImages).filter(UserProjectImages.user_id == user_id).all()

    if not db_projects:
        raise_not_found_exception("No projects found for user")
    
    return [ImageOut.model_validate(img) for img in db_projects]

@router.get("/all_projects")
def show_all_projects(db: Session = Depends(get_db)):
    """Return all projects with user details."""
    projects = (
        db.query(
            UserProjectImages.id,
            UserProjectImages.image_path,
            UserProjectImages.description,
            UserProjectImages.order_status,
            UserProjectImages.created_at,
            Users.username,
            Users.email
        )
        .join(Users, Users.id == UserProjectImages.user_id)
        .all()
    )

    return [dict(project._mapping) for project in projects]
