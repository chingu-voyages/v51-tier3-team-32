module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    amount: {
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

  Expense.associate = (models) => {
    Expense.belongsTo(models.Group, {
      foreignKey: 'expenseId',
      onDelete: 'CASCADE',
    });
    Expense.belongsToMany(models.User, {through: 'ExpenseUserSplit'});
  }

  return Expense;
};
