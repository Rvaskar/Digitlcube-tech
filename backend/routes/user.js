const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/userMiddleware");
const jwt_SECRET = "User@1!jwttoken";

//!ROUTE1: CREATING ENDPOINT FOR USER SIGNUP
//POST "/api/user/createuser"
router.post(
  "/createuser",
  [
    body("username", "Enter valid Username").isLength({ min: 3 }),
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry a user with this email already exists",
          });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create a new User
      user = await User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, jwt_SECRET);

      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Sever Error.");
    }
  }
);

//!ROUTE2: CREATING ENDPOINT FOR USER LOGIN AUTHENTICATION

// POST "/api/user/login"
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
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      //Creating auth token to give access of website to user
      const authToken = jwt.sign(data, jwt_SECRET);

      // res.json(user)
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error ");
    }
  }
);

//!ROUTE3: CREATING ENDPOINT FOR GETTING  USER DETAILS

//POST "/api/user/getuser"
router.post("/getuser", userMiddleware, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password"); //* -password means  do not show the password field in response

    //! here we access only data as we needed
    const { name, username, email, date, role } = user;
    res.send({
      name: name,
      username: username,
      email: email,
      role: role,
      date: date,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error ");
  }
});

module.exports = router;
