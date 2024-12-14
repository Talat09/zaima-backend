const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt");

module.exports = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'

  try {
    // Verify the token
    const verified = jwt.verify(token, secret);
    req.user = verified; // Attach user info from token payload to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};
