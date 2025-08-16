
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {

    console.log("🔐 Incoming Cookies:", req.cookies);
    console.log("🔐 Authorization Header:", req.headers.authorization);

    const token =
      (req.cookies && req.cookies.token) ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    console.log("📦 Extracted Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    console.log("✅ Decoded User:", decoded);

    req.user = decoded;

   

    next();
  } catch (error) {
    console.error("❌ JWT Auth Error:", error.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;





