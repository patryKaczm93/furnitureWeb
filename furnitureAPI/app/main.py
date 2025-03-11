from fastapi import FastAPI, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .models import Base
from .database import engine, Sessionlocal
from .routes import auth, users, image, create_admin

Base.metadata.create_all(bind=engine)

# Tworzymy instancję FastAPI
app = FastAPI(
    title="API z autoryzacją OAuth2",
    description="API do testów autoryzacji",
    version="1.0.0",
    openapi_tags=[{"name": "authentication", "description": "Operacje związane z logowaniem i tokenami"}],
)


origins = ['http://localhost:5173']
app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Rejestrujemy router z endpointami dla użytkowników
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(image.router)

@app.on_event("startup")
def startup_event():
    db = Sessionlocal()
    try:
        create_admin.create_admin_user(db)
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}