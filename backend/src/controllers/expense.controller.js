const { user } = require("pg/lib/defaults");
const db = require("../models");

const createExpense = async (req, res) => { 
  try {
    const { amount, groupId } = req.body;
    const group = await db.Group.findByPk(groupId);
  
    const expense = await db.Expense.create({amount});

    await group.addExpenses(expense);

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

const splitExpense = async (req, res) => {
  // Expecting data format like: { splitData: [{ userId: 1, splitAmount: 200 }] }
  try {
    const { splitData } = req.body; 
    const expense = await db.Expense.findByPk(req.params.id);
    let totalSplitAmount = splitData.reduce((acc, { splitAmount }) => acc + splitAmount, 0);

    if (totalSplitAmount !== expense.amount) {
      return res.status(400).json({
        status: 'error',
        message: 'Split amount does not match the total expense amount',});
      }

    if (!expense) {
      return res.status(404).json({
        status: 'error',
        message: 'Expense not found',
      });
    }

    for (const { userId, splitAmount } of splitData) {
      const user = await db.User.findByPk(userId);

      if (user) {
        await expense.addUser(user, { through: { splitAmount } });
      }
    }

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

const settleSplitExpense = async (req, res) => {
  try {
    const { userId  } = req.body; 
    
    await db.ExpenseUserSplit.update(
      { settled: true },
      { where: { ExpenseId: req.params.id, UserId: userId } } 
    );


    res.status(200).json({
      status: 'success',
      message: 'Expense split settled successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

const settleExpense = async (req, res) => {
  try {
    const unsettledCount = await db.ExpenseUserSplit.count({
      where: { ExpenseId: req.params.id, settled: false }
    });
    
    if (unsettledCount > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'All splits are not settled',
      });
    } 

    await db.Expense.update(
      { settled: true },
      { where: { id: req.params.id } } 
    );

    res.status(200).json({
      status: 'success',
      message: 'Expense settled successfully',
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
  settleSplitExpense,
  settleExpense,
};
