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
  - Secure registration and login with password hashing
  - JWT-based authentication with HTTP-only cookies
  - Protected routes using middleware
  - Change password functionality

- **Problem Management**
  - Add, edit, and delete DSA problems
  - Track problem status: *Not Started / Solved / Revision*
  - Automatic addition of 10 default problems for new users
  - Support for multiple platforms (LeetCode, Codeforces, CodeChef, etc.)

- **Progress Dashboard**
  - Visual progress bar showing solved/revision/not started ratios
  - Difficulty-wise statistics (Easy / Medium / Hard)
  - Total problem counts and analytics
  - Responsive sidebar navigation

- **Search & Filters**
  - Search problems by title
  - Filter by topic, difficulty, and status
  - Real-time filtering on dashboard

- **User Profile**
  - Update coding platform handles (Codeforces, CodeChef, LeetCode)
  - Profile management with secure updates

- **User Experience**
  - Clean, modern, and responsive UI inspired by Dribbble designs
  - Mobile-friendly with collapsible sidebar
  - Intuitive navigation and forms
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
│   ├── add.ejs
│   ├── change-password.ejs
│   ├── edit.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   └── register.ejs
├── .env
├── app.js
├── data.js
├── package.json
└── README.md
```

---

## � Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dsa-practice-tracker.git
   cd dsa-practice-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     MONGO_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_super_secret_jwt_key
     ```

4. **Run the application**
   ```bash
   npm start
   ```

5. **Access the app**
   - Open your browser and go to `http://localhost:3000`
   - Register a new account or login

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Server generates a JWT token
3. JWT is stored securely in an HTTP-only cookie
4. Middleware validates the token for protected routes
5. Each user can access only their own data
6. New users automatically get 10 starter problems added to their account

---

## � Usage

### For New Users
- Register with email and password
- 10 default problems are automatically added covering various topics and difficulties
- Update your profile with coding platform handles
- Start solving problems and update their status

### Managing Problems
- **Add Problem**: Click "Add Problem" to add new DSA problems
- **Edit Problem**: Click the edit icon next to any problem
- **Delete Problem**: Click the delete icon next to any problem
- **Update Status**: Use the dropdown to change problem status
- **Filter & Search**: Use the filters and search bar to find specific problems

### Profile Management
- Update your Codeforces, CodeChef, and LeetCode handles
- Change your password securely

---

## 🗃️ Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  codeforces: String,
  codechef: String,
  leetcode: String,
  timestamps: true
}
```

### Problem Model
```javascript
{
  title: String (required),
  platform: String (required),
  topic: String (required),
  difficulty: String (required),
  status: String (default: "Not Started"),
  link: String (required),
  userId: ObjectId (ref: User, required),
  timestamps: true
}
```

---

## 👤 Author

**Yash Patidar**  
IIT (ISM) Dhanbad  

---
