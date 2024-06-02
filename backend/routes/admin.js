const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const adminMiddleware = require("../middleware/adminMiddleware");
const jwt_SECRET = "Admin@1!webtoken"; 

//!ROUTE1: CREATING ENDPOINT FOR USER SIGNUP
//POST "/api/admin/createadmin"
router.post(
  "/createadmin",
  [
    body("username", "Enter valid Username").isLength({ min: 3 }),
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //Check whether the user with same email exits already
    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }

      //Using bcrypt for password hash

      const salt = await bcrypt.genSalt(10); 
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create a new User
      admin = await Admin.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        admin: {
          id: admin.id,
        },
      };

      //creating auth token to give access of website to user
      const authToken = jwt.sign(data, jwt_SECRET);

      success = true;
      res.json({ success, authToken }); 
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Sever Error.");
    }
  }
);

//!ROUTE2: CREATING ENDPOINT FOR Admin LOGIN AUTHENTICATION

//POST "/api/admin/login"
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists(), //.exist use to check value blank or not
  ],
  async (req, res) => {
    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" }); 
      }

      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        }); 
      }

      const data = {
        admin: {
          id: admin.id,
        },
      };

      //creating auth token to give access of website to user
      const authToken = jwt.sign(data, jwt_SECRET);

      
      success = true;
      res.json({ success, authToken }); 
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error ");
    }
  }
);

//!ROUTE3: CREATING ENDPOINT FOR GETTING  Admin DETAILS

// POST "/api/admin/getadmin"
router.post("/getadmin", adminMiddleware, async (req, res) => {
  try {
    let adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password"); //* -password means  do not show the password field in response
    // res.send(user)   //* by this we can get all user value

    //! here we access only data that we needed
    const { name, username, email, date } = admin;
    res.send({
      name: name,
      username: username,
      email: email,
      date: date,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error ");
  }
});

//! ROUTE4: Route to get all users, accessible only to admins
router.get("/allusers", adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//! ROUTE5: Route to edit a user, accessible only to admins
router.put("/edituser/:id", adminMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, name } = req.body;

    // Validate input
    if (!username || !email || !name) {
      return res.status(400).json({
        error: "Please provide all required fields: username, email, name",
      });
    }

    // Find the user by ID and update the provided fields
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, name },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//! ROUTE6: Route to delete a user, accessible only to admins

router.delete("/deleteuser/:id", adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Check if user exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    // find and delete the user
    await User.findByIdAndDelete(req.params.id);

    res.json({ success: "User has been deleted", user: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
