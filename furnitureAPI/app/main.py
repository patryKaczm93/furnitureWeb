from fastapi import FastAPI, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .models import Base
from .database import engine, SessionLocal
from .routes import auth, users, image, password, create_admin, project_status

# Create all tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="OAuth2 Authorization API",
    description="API for testing authorization",
    version="1.0.0",
    openapi_tags=[{"name": "authentication", "description": "Operations related to login and tokens"}],
)

# Allowed origins for CORS
origins = ['http://localhost:5173']

# Mount static files directory under /static path
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Add CORS middleware to handle cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (consider restricting in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers from different modules
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(image.router)
app.include_router(password.router)
app.include_router(project_status.router)

@app.on_event("startup")
def startup_event():
    """Create admin user on application startup."""
    db = SessionLocal()
    try:
        create_admin.create_admin_user(db)
    finally:
        db.close()

@app.get("/")
def read_root():
    """Root endpoint returning a welcome message."""
    return {"message": "Hello from FastAPI!"}
