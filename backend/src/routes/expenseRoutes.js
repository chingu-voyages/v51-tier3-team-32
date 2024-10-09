const express = require("express");
const { authenticateUser } = require("../middlewares/authenticateUser");
const { createExpense, splitExpense, settleSplitExpense, settleExpense } = require("../controllers/expense.controller");
const router = express.Router();

router.post('/', authenticateUser, createExpense);
router.post('/:id/split', authenticateUser, splitExpense);
router.put('/:id/settle', authenticateUser, settleExpense);
router.put('/:id/split', authenticateUser, settleSplitExpense);

module.exports = router;