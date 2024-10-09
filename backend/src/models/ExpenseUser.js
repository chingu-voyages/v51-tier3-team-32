module.exports = (sequelize, DataTypes) => {
  const ExpenseUser = sequelize.define('ExpenseUser', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expenseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    splitAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  });


  return ExpenseUser;
};


