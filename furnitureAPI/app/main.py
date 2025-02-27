from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app import dependencies


app = FastAPI()

#test

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

@app.get("/test-db")
def tes_db(db: Session = Depends(dependencies.get_db)):
    try:
        result = db.execute("SELECT tablename FROM pg_tables WHERE schemaname = 'public';")
        tables = result.fetchall()
        return {"tables": [table[0] for table in tables]}
    except Exception as e:
        return {"error": str(e)} 