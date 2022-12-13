import { Request, Response } from "express";
import Expense from '../models/Expense';
module.exports = {
  getDashboard: async (req: any, res: any) => {
    const expenses = await Expense.find({id: req.user._id});
    console.log('expenses for user:', expenses);
    res.send(expenses);
  },
  createExpense: async (req: any, res: any) => {
    const newExpense = new Expense({
      title: req.body.title,
      value: Number(req.body.value),
      category: req.body.category,
      date: Date.now(),
      user: req.user.id
    })
    const createdExpense = await newExpense.save();
    res.json(createdExpense);
  }
};
