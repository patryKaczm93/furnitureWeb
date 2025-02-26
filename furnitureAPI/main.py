from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Zezwól na dostęp z dowolnych źródeł (w produkcji możesz tu podać konkretne adresy)
    allow_credentials=True,
    allow_methods=["*"],  # Zezwól na wszystkie metody (GET, POST, itd.)
    allow_headers=["*"],  # Zezwól na wszystkie nagłówki
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}