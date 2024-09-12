const { verifyToken } = require('../config/jwt');
const User = require('../models/User');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decodedToken = verifyToken(token);
  // find user by email
  // else return error

  next();
}

module.exports = {
  authenticateUser,
};