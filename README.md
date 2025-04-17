# 🎫 Support Ticket Managing System

A web-based application to manage support tickets efficiently. This system allows users to submit support requests and enables administrators to manage and resolve them quickly through a secure and user-friendly interface.

---

## 📌 Overview

- 🔐 JWT-based authentication system
- 🎫 Ticket creation and tracking
- 👥 Role-based access (Admin & User)
- 📊 Admin dashboard for monitoring
- 📬 Email-like messaging system per ticket
- 🌐 Built with Laravel (API) + React.js (Frontend)

---

## 🛠️ Tech Stack

| Layer     | Technology    |
|-----------|---------------|
| Frontend  | React.js        |
| Backend   | Laravel       |
| Database  | MySQL         |
| Auth      | JWT (Laravel) |
| Tools     | Composer, NPM |

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- ✅ PHP >= 7.3
- ✅ Composer
- ✅ Node.js & NPM
- ✅ MySQL

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Y-Hiriejhha-Dharini/support_ticket_managing_system.git
cd support_ticket_managing_system
```

### 2️⃣ Backend Setup

```bash
cd support_system_backend
composer install
change .env.example to .env
php artisan key:generate
php artisan jwt:secret
```
### 🔧 Update .env with your MySQL database credentials.

### 3️⃣ Frontend Setup
```bash
cd ../support_system_frontend
npm install
npm run dev
```
### 4️⃣ Database Migration & Seeding
```bash
cd ../support_system_backend
php artisan migrate --seed
```
### 5️⃣ Start the Server
```bash
composer run dev
```
### 📍 Visit: http://localhost:8000

# ✨ Key Features
## ✅ User Portal (React.js Frontend)
User registration and login using JWT
Submit new support tickets with the problem description				
View the list of submitted tickets with status (read / unread)
Reply to ticket conversations
Responsive, mobile-friendly design using Vue and Bootstrap

## ✅ Backend API (Laravel)
RESTful API structure with clean route grouping
JWT authentication for both users and support employees
Form request validation for input safety
Secure password hashing and email uniqueness checks
Clean controller-service structure for separation of concerns
Error-handling with appropriate HTTP response codes
CORS and API middleware protections
The project is structured for easy extension and testing

# 🧱 Database Schema (Highlights)
users: Stores users
tickets: Stores ticket details
password_resets: Laravel’s default table for reset flows

# 🗂️ Architecture
The system is built using clean architectural principles to ensure scalability and maintainability.

## 🧠 Backend (Laravel)
MVC Architecture: Laravel’s Model-View-Controller pattern
Form Request Validation: Clean validation logic with custom error messages
JWT Auth: Token-based authentication via Laravel tymon/jwt-auth
Route Grouping: Separate routes for user and support employees APIs
Secure Design: CSRF protection (backend), hashed passwords, and validation
Error Handling: Custom response messages with status codes

## 🎨 Frontend (React.js + Bootstrap)
Component-Based Architecture: Reusable React components
React Router: Client-side routing for a multi-page experience
Axios: Used for calling backend APIs with tokens
JWT Auth Flow: Frontend manages auth tokens and role-based access
Responsive Design: Built with tailwind.css to support desktop & mobile views

# 📸 Screenshots
Screenshots are available in the support_service_ss/ folder for visual reference.

# 📄 License
This project is licensed under the MIT License.

# 🙋‍♀️ Author
Made with ❤️ by Y. Hiriejhha Dharini

