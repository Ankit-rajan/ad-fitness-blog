const express = require("express");
const { 
    registerUser,
     loginUser, 
     getProfile,
     updateProfile,

} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Router is working");
});

router.post("/register", registerUser);

router.post("/login",loginUser);

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

module.exports = router;
