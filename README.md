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
# Admin user credentials (used for creating the admin account)
ADMIN_EMAIL=admin@example.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# JWT security settings
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Database configuration
DATABASE_URL=postgresql://admin:admin123@postgres:5432/mydatabase

# Frontend URL (e.g., the address where your React app runs)
FRONTEND_URL=http://localhost:8000

# SMTP settings for email sending
SMTP_SERVER=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASSWORD=

# Paths to folders for static file uploads
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

```bash
- Unit tests for utility functions and data validation
- Integration tests for API endpoints (including authentication)
- Functional tests for user flows (registration, login, file upload)
- Security tests for access control and protected routes
 ```

---

## 📬 Contact

If you have any questions or want to contribute – feel free to reach out!
