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
    }
  },
  {
    timestamps: true,
  }
);

  User.associate = (models) => {
    User.hasMany(models.Group, {
      foreignKey: 'ownerId',
      as: 'groups',
    });

    User.belongsToMany(models.Group, {through: 'GroupUser'});
    User.belongsToMany(models.Expense, {through: 'ExpenseUserSplit'});
  }

  return User;
};


