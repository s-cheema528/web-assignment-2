const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  res.render('index', { transactions, income, expense, balance });
});

router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', async (req, res) => {
  const { type, amount, description } = req.body;
  const transaction = new Transaction({ type, amount, description });
  await transaction.save();
  res.redirect('/');
});

module.exports = router;
