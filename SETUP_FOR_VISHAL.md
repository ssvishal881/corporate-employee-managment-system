# Employee Management System – Setup Guide

This guide explains how to run the Corporate Employee Management System project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/ssvishal881/corporate-employee-managment-system.git
```

## 2. Open Project Folder

```bash
cd corporate-employee-managment-system
```

---

# Backend Setup

## 3. Go to server folder

```bash
cd server
```

## 4. Install dependencies

```bash
npm install
```

## 5. Create `.env` file

Create a `.env` file in the server folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 6. Start backend server

```bash
npm start
```

Server will run on:

```
http://localhost:5000
```

---

# Frontend Setup

Open a new terminal.

## 7. Go to frontend folder

```bash
cd frontend
```

## 8. Install dependencies

```bash
npm install
```

## 9. Run frontend

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# Technologies Used

Frontend

- React
- Tailwind CSS
- Axios
- React Router

Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer

---

# Project Structure

```
corporate-employee-managment-system
│
├── frontend
│   ├── src
│   └── public
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   └── middleware
│
└── README.md
```

---

# Author

Vishal Jadhav
TYBScIT – Mumbai University
