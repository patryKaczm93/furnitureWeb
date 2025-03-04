from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import Base
from app.db import engine, Sessionlocal
from app.routers import user_router
from app.initial_data import create_admin_user



Base.metadata.create_all(bind=engine)

# Tworzymy instancję FastAPI
app = FastAPI(
    title="API z autoryzacją OAuth2",
    description="API do testów autoryzacji",
    version="1.0.0",
    openapi_tags=[{"name": "authentication", "description": "Operacje związane z logowaniem i tokenami"}],
)


origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Rejestrujemy router z endpointami dla użytkowników
app.include_router(user_router, tags=["users"])

@app.on_event("startup")
def startup_event():
    db = Sessionlocal()
    try:
        create_admin_user(db)
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}