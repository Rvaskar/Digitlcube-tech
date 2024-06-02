const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const adminJwtSecret = "Admin@1!webtoken";

const adminMiddleware = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, adminJwtSecret);
    req.admin = data.admin;

    // Fetch the admin from the database and check role
    const admin = await Admin.findById(req.admin.id);
    if (!admin || admin.role !== "admin") {
      return res.status(403).send({ error: "Access denied" });
    }

    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = adminMiddleware;
