# Task Manager

A simple Task Manager web app where users can register, log in, and manage personal tasks.  
Built with **React (Vite + Tailwind)** for the frontend and **Node.js + Express + MongoDB** for the backend.

---

## 🚀 Features
- **User Authentication** (Register/Login/Logout with JWT)
- **Password Security** with bcrypt hashing
- **Task Management**  
  - Add, update, delete tasks  
  - Mark tasks complete/incomplete  
  - Pin/unpin tasks  
  - Sort tasks by date, title, pinned  
- **User-Specific Tasks** (each user only sees their tasks)
- **Responsive UI** with Tailwind
- **Pagination** for tasks list

---

## 🛠 Tech Stack
**Frontend:** React, Vite, Tailwind, Axios, React Router  
**Backend:** Node.js, Express, JWT, bcrypt, Mongoose  
**Database:** MongoDB Atlas (cloud-hosted)  
---

## ⚙️ Setup Instructions

### Backend (server)
```bash
cd server
npm install

**Deployment:** Backend → Render, Frontend → Vercel

---

## 📂 Project Structure

final-task-manager/
│── client/ # React frontend
│── server/ # Node.js backend

Create a .env file in server/:

PORT=5000
MONGO_URI=your-mongodb-uri-with-db-name
JWT_SECRET=your-secret
FRONTEND_URL=http://localhost:5173

Run the backend:
npm run dev

Frontend (client)
cd client
npm install

Create .env.local in client/:
VITE_API_URL=http://localhost:5000

Run the frontend:
npm run dev

## 🌐 Deployment

- **Backend deployed on Render

- **Frontend deployed on Vercel

- **Env vars configured on both platforms for production

##📖 How It Works

- **Users register/login → backend issues a JWT

- **JWT stored in localStorage, sent in Authorization header

- **All task CRUD APIs are protected by authMiddleware

- **Tasks are fetched per user, sorted and filtered on frontend

- **UI built with reusable React components (TaskForm, TaskItem, SortBar)

#👤 Author

##Built by Mohammed Fariz
