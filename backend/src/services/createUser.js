const { generateToken } = require('../config/jwt.js');
const db = require('../models');

const createUser = async (email, name) => {
  let user;
  try {
     user = await db.User.findOne({
      where: { email: email }
    });

    if (!user) {
      user = await db.User.create({
        email,
        name
      });
    } 
    const token = generateToken(user.email);

    return { user, token };

  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
}