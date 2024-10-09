const db = require("../models");

const createExpense = async (req, res) => { 
  try {
    const { amount, groupId } = req.body;
    const user = req.user;
    const expense = await db.Expense.create({
      amount,
      groupId
    });

    res.status(201).json({
      status: 'success',
      message: 'Expense created successfully',
      data: {
        id: expense.id,
        amount,
        groupId
      },
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

data = [{
  userId: 1, splitAmount: 200
}]

const splitExpense = async (req, res) => { 
  try {
    const { splitData } = req.body;
    const expenseId = req.params.id;

    splitData.forEach((splitAmount, userId) => {
     db.ExpenseUser.create({
        splitAmount, userId, expenseId
      });
    })
  

    res.status(201).json({
      status: 'success',
      message: 'Expense split created successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};




module.exports = {
  createExpense,
  splitExpense,
};