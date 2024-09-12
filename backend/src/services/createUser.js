const { generateToken } = require('../../config/jwt');
const User = require('../models/User');

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
    console.error('Error finding user:', error);
  }
};

module.exports = {
  createUser,
}