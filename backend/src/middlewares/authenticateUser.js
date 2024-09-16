const { verifyToken } = require('../config/jwt');
const db = require('../models');

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
 
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decodedToken = verifyToken(token);
  const user = await db.User.findOne({
    where: { email: decodedToken }
  });

  if (user) {
    req.user = user;
  }
  
  next();
}

module.exports = {
  authenticateUser,
};