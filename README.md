# furnitureWeb# 🪱 Furniture Project – FastAPI + React

An application for managing furniture projects. The project consists of a backend (FastAPI) and a frontend (React). It allows user registration, login, project management, and image uploads.

---

## 📁 Project Structure

```
.
├── furnitureAPI       # Backend – FastAPI
├── furnitureApp       # Frontend – React + Vite
├── docker-compose.yml # Docker config
└── README.md
```

---

## ⚙️ Requirements

* Python 3.9+
* Node.js 18+
* npm or yarn
* (Optional) Docker + Docker Compose

---

## 🚀 Running Locally

### 1. Backend – FastAPI

```bash
cd furnitureAPI
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Note:** Create a `.env` file in the `furnitureAPI` folder based on the example below.

#### 📄 Example `.env`:

```env
# Dane administratora (używane do tworzenia konta admina)
ADMIN_EMAIL=admin@example.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Ustawienia bezpieczeństwa JWT
SECRET_KEY=twój-sekretny-klucz
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Konfiguracja bazy danych
DATABASE_URL=postgresql://admin:admin123@postgres:5432/mydatabase

# URL frontendu (np. adres, pod którym działa React)
FRONTEND_URL=http://localhost:8000

# Ustawienia serwera SMTP do wysyłki maili
SMTP_SERVER=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASSWORD=

# Ścieżki do folderów z plikami statycznymi
UPLOAD_FOLDER=static/images
UPLOAD_DONE_PROJECTS=static/done_projects
```

---

### 2. Frontend – React

```bash
cd furnitureApp
npm install
npm run dev
```

---

## 🐳 Running with Docker (optional)

**Requirements:** Docker + Docker Compose

```bash
docker-compose up --build
```

This will automatically start both the backend and frontend. Make sure the `.env` file exists in `furnitureAPI`.

---

## 🔧 Useful Git Commands

### 📅 Cloning the repository

```bash
git clone <repository_url>
cd <project_folder>
```

### 🧹 After updating `.gitignore`

```bash
git rm -r --cached furnitureApp/node_modules furnitureAPI/venv furnitureAPI/app/static/images
git add .
git commit -m "Updated .gitignore"
```

### 📤 Typical workflow

```bash
git add .
git commit -m "Your commit message"
git push
```

---

## 🧪 TODO / Future Features

*

---

## 📬 Contact

If you have any questions or want to contribute – feel free to reach out!
