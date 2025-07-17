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
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=supersecretkey
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
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
