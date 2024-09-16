const { generateToken } = require('../config/jwt.js');
const { User } = require('../models');

const createUser = async (email, name) => {
  try {
    const user = await User.findOne({
      where: { email: email }
    });

    if (user) {
      return user
    } else {
      const user = await User.create({
        email,
        name
      });

      const token = generateToken(user.id);

      return { user, token };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
}