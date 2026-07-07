const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // 1. Authorization Header Read
    const authHeader = req.headers.authorization;

    // 2. Check Header Exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });
    }

    // 3. Extract Token
    const token = authHeader.split(" ")[1];

    // 4. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // 6. Attach User to Request
    req.user = user;

    // 7. Continue to Next Middleware / Controller
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = protect;