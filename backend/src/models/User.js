module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already exist.",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email cannot be empty."
        },
          isEmail: {
            args: true,
            msg: "Must be a valid email address."
          }
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Group, {
      foreignKey: 'ownerId',
      as: 'groups',
    });
  }

  return User;
};


