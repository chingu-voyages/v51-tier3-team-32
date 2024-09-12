const jwt = require("jsonwebtoken");

// generate token function from .env settings
const generateToken = (userId) => {
  return jwt.sign(
     userId,
     process.env.JWT_SECRET,
     { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}

const verifyToken = (token) => {
  const decodedRefresh = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  return decodedRefresh;
}

module.exports = { generateToken, verifyToken }