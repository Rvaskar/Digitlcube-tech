<h1>Digitlcube Tech Task</h1>
< br / >< br / >

Overview < br / >
  This project demonstrates my ability to create a full-stack application using MongoDB and the Context API for state management.< br / >
< br / >
Features < br / >
  User authentication and authorization < br / >
  CRUD operations for managing users (admin only)  < br / >

< br / >< br / >
Technologies Used < br / >
  Backend: Node.js, Express, MongoDB, Mongoose, Axios < br / >
  Frontend: React, Context API < br / >

< br / >< br / >
Installation < br / >
Prerequisites < br / >
  Node.js and npm < br / >

Install backend dependencies: < br / >
cd backend < br / >
  npm install < br / >
  npm install bcryptjs body-parser cors dotenv express express-validator helmet jsonwebtoken mongoose < br / >
  
  < br / >< br / >

Install frontend dependencies: < br / >< br / >
cd client < br / >
  npm install < br / >
  npm i react-router-dom axios < br / >

< br / >



Navigate to the homepage < br / >
  User: Sign up or log in < br / >
  Admin: Log in and access or control CRUD operations < br / >
< br / >< br / >
API Endpoints < br / >

User Endpoints < br / >
GET /api/user/getuser: Get user details  < br / >
POST /api/user/createuser: Create a new user  < br / >
POST /api/user/login: User login   < br / >

Admin Endpoints < br / >
  GET /api/admin/allusers: Get all users < br / >
  GET /api/admin/getadmin: Get admin details < br / >
  POST /api/admin/createadmin: Create a new admin < br / >
  POST /api/admin/login: Admin login < br / >
  PUT /api/admin/edituser/:id: Edit a user < br / >
  DELETE /api/admin/deleteuser/:id: Delete a user < br / >

Contact < br / >
For questions or feedback, please reach out to Rutik Vaskar at rutikkvaskar9@gmail.com.
