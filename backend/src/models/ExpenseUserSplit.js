const { user } = require("pg/lib/defaults");

module.exports = (sequelize, DataTypes) => {
  const ExpenseUserSplit = sequelize.define('ExpenseUserSplit', {
    splitAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    settled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  });

  return ExpenseUserSplit;
};


// expense
/*
id,
amount
groupId
settled ---

expense belongsToGroup
group hasmany expenses

expenseSplit

expense belongsToMany users
id, expenseId, userId, amount, settled
expense.addUsers(user, {})

share among users, amounts, then submit
*/
