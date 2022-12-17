import { Request, Response } from "express";
import Transaction from "../models/Transaction";
module.exports = {
  getDashboard: async (req: any, res: any) => {
    if (req.user) {
      const expenses = await Transaction.find({ user: req.user._id });
      res.send(expenses);
    }
  },
  createTransaction: async (req: any, res: any) => {
    const newTransaction = new Transaction({
      title: req.body.title,
      value: Number(req.body.value),
      category: req.body.category,
      isIncome: req.body.isIncome,
      date: req.body.date,
      user: req.user.id,
    });
    const createdTransaction = await newTransaction.save();
    res.json(createdTransaction);
  },
};
