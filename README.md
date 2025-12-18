# 🚀 DSA Practice Tracker

DSA Practice Tracker is a full-stack web application designed to help users systematically track their **Data Structures & Algorithms (DSA)** problem-solving progress.  
It provides a personalized dashboard with secure authentication, progress analytics, and cloud-based data persistence.

---

## 🌐 Live Demo
https://dsa-practice-tracker-znyd.onrender.com

> ⚠️ Hosted on Render’s free tier. The first request after inactivity may take ~30–50 seconds due to cold start.

---

## ✨ Features

- **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Protected routes using middleware

- **Problem Management**
  - Add, edit, and delete DSA problems
  - Track problem status: *Not Started / Solved / Revision*

- **Progress Dashboard**
  - Total problems solved
  - Difficulty-wise statistics (Easy / Medium / Hard)
  - Visual progress indicators

- **Search & Filters**
  - Search problems by name
  - Filter by topic, difficulty, and status

- **User Experience**
  - Clean and responsive UI
  - Profile dropdown with logout
  - User-specific data isolation

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** EJS, CSS  
- **Database:** MongoDB Atlas  
- **Authentication:** JSON Web Tokens (JWT)  
- **Deployment:** Render  
- **Version Control:** Git & GitHub  

---

## 🗂️ Project Structure

```
DSA-PRACTICE-TRACKER/
├── middleware/
│   └── auth.js
├── models/
│   ├── Problem.js
│   └── User.js
├── public/
│   └── style.css
├── routes/
│   ├── authRoutes.js
│   └── problemRoutes.js
├── views/
│   ├── index.ejs
│   ├── edit.ejs
│   ├── login.ejs
│   └── register.ejs
├── app.js
├── package.json
└── README.md
```

---

## 🔐 Authentication Flow

1. User registers or logs in  
2. Server generates a JWT  
3. JWT is stored securely in an HTTP-only cookie  
4. Middleware validates the token for protected routes  
5. Each user can access only their own data  

---

## 👤 Author

**Yash Patidar**  
IIT (ISM) Dhanbad  

---
