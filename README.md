# Digitlcube Tech Task

## Overview 
This project demonstrates my ability to create a full-stack application using MongoDB and the Context API for state management.

## Features
- User authentication and authorization 
- CRUD operations for managing users (admin only)  

## Technologies Used
- **Backend**: Node.js, Express, MongoDB, Mongoose, Axios
- **Frontend**: React, Context API

## Installation

### Prerequisites
- Node.js and npm

### Install Backend Dependencies

cd backend
npm install
npm install bcryptjs body-parser cors dotenv express express-validator helmet jsonwebtoken mongoose
Navigate to the homepage
User: Sign up or log in
Admin: Log in and access or control CRUD operations
API Endpoints:

User Endpoints
GET /api/user/getuser: Get user details
POST /api/user/createuser: Create a new user
POST /api/user/login: User login
Admin Endpoints
GET /api/admin/allusers: Get all users
GET /api/admin/getadmin: Get admin details
POST /api/admin/createadmin: Create a new admin
POST /api/admin/login: Admin login
PUT /api/admin/edituser/:id: Edit a user
DELETE /api/admin/deleteuser/:id: Delete a user
Contact:
For questions or feedback, please reach out to Rutik Vaskar at rutikkvaskar9@gmail.com.
