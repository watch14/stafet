const express = require("express");
const router = express.Router();
const { validateAuthData } = require("../middleware/validation");
const {
  login,
  verifyToken,
  changePassword
} = require("../controllers/authController");

// Login endpoint
router.post("/login", validateAuthData, login);

// Verify token endpoint
router.get("/verify", verifyToken);

// Change password endpoint
router.post("/change-password", changePassword);

module.exports = router;
