module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  });

  Expense.associate = (models) => {
    Expense.belongsTo(models.Group, {
      foreignKey: 'expenseId',
      onDelete: 'CASCADE',
    });

    Expense.belongsToMany(models.User, {through: 'ExpenseUser'});
  }

  return Expense;
};

