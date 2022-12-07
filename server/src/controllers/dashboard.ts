import { Request, Response } from "express";
import Expense from '../models/Expense';
module.exports = {
  getDashboard: async (req: Request, res: Response) => {
    res.send("OK");
  },
  createExpense: async (req: Request, res: Response) => {
    const newExpense = new Expense({
      title: req.body.title,
      value: 100,
    })
    const createdExpense = await newExpense.save();
    res.json(createdExpense);
  }
};
