import { Request, Response } from "express";
import Expense from '../models/Expense';
module.exports = {
  getDashboard: async (req: any, res: any) => {
    const expenses = await Expense.find({user: req.user._id});
    res.send(expenses);
  },
  createExpense: async (req: any, res: any) => {
    const newExpense = new Expense({
      title: req.body.title,
      value: Number(req.body.value),
      category: req.body.category,
      date: req.body.date,
      user: req.user.id
    })
    const createdExpense = await newExpense.save();
    res.json(createdExpense);
  }
};
