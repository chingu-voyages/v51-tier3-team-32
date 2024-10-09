const express = require("express");
const { authenticateUser } = require("../middlewares/authenticateUser");
const { createExpense, splitExpense } = require("../controllers/expense.controller");
const router = express.Router();

router.post('/', authenticateUser, createExpense);
router.post('/:id/split', authenticateUser, splitExpense);


module.exports = router;