from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.db import engine
from app.routers import user_router



models.Base.metadata.create_all(bind=engine)

# Tworzymy instancję FastAPI
app = FastAPI(
    title="API z autoryzacją OAuth2",
    description="API do testów autoryzacji",
    version="1.0.0",
    openapi_tags=[{"name": "authentication", "description": "Operacje związane z logowaniem i tokenami"}],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Rejestrujemy router z endpointami dla użytkowników
app.include_router(user_router, prefix="/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}