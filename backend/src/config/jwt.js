const jwt = require("jsonwebtoken");

// generate token function from .env settings
const generateToken = (email) => {
  return jwt.sign(
     email,
     process.env.JWT_SECRET
  );
}

const verifyToken = (token) => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  return decoded;
}

module.exports = { generateToken, verifyToken }