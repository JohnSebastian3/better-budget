import Category from "../models/Category";
import Transaction from "../models/Transaction";
import Subcategory from "../models/Category";
import mongoose from "mongoose";
module.exports = {
  getDashboard: async (req: any, res: any) => {
    try {
      if (req.user) {
        const userCategories = await Category.find({ user: req.user._id });

        const transactions = await Transaction.find({ user: req.user._id });
        res.send({ transactions, categories: userCategories });
      }
    } catch (err) {}
  },
  addTransaction: async (req: any, res: any) => {
    try {
      const newTransaction = new Transaction({
        title: req.body.title,
        value: Number(req.body.value),
        category: req.body.category,
        subcategory: req.body.subcategory,
        isIncome: req.body.isIncome,
        date: new Date(req.body.date),
        user: req.user.id,
      });
      const createdTransaction = await newTransaction.save();
      res.json(createdTransaction);
    } catch (err) {
      console.log(err);
    }
  },
  createBudget: async (req: any, res: any) => {
    try {
      const date = new Date(req.body.year, req.body.month, 1);

      const categoryIncome = new Category({
        title: "Income",
        subcategories: [
          {
            title: "Paychecks",
            budget: 0,
            date,
          },
        ],
        date,
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      await categoryIncome.save();

      const categorySpending = new Category({
        title: "Spending",
        subcategories: [
          {
            title: "Groceries",
            budget: 0,
            date,
          },
        ],
        date,
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      await categorySpending.save();

      const categoryBills = new Category({
        title: "Bills",
        subcategories: [
          {
            title: "Rent",
            budget: 0,
            date,
          },
        ],
        date,
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      await categoryBills.save();

      const categorySubscriptions = new Category({
        title: "Subscriptions",
        subcategories: [
          {
            title: "Streaming",
            budget: 0,
            date,
          },
        ],
        date,
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      await categorySubscriptions.save();

      const categoryDebt = new Category({
        title: "Debt",
        subcategories: [
          {
            title: "Credit Card",
            budget: 0,
            date,
          },
        ],
        date,
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      await categoryDebt.save();

      const categoryGifts = new Category({
        title: "Gifts",
        subcategories: [
          {
            title: "Charity",
            budget: 0,
            date,
          },
        ],
        date,
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      await categoryGifts.save();

      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  addCategory: async (req: any, res: any) => {
    try {
      let newCategory = new Category({
        title: req.body.newCategory.title,
        user: new mongoose.Types.ObjectId(req.user.id),
        date: req.body.newCategory.date,
      });

      await newCategory.save();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  addSubcategory: async (req: any, res: any) => {
    try {
      // const date = new Date(
      //   new Date(req.body.subcategory.date).getUTCFullYear(),
      //   new Date(req.body.subcategory.date).getUTCMonth(),
      //   1
      // );
      await Category.findOneAndUpdate(
        {
          user: req.user._id,
          title: req.params.category,
          date: req.body.subcategory.date,
        },
        {
          $push: {
            subcategories: {
              title: req.body.subcategory.title,
              budget: Number(req.body.subcategory.budget),
              date: req.body.subcategory.date,
            },
          },
        }
      );

      res.sendStatus(200);
    } catch (err) {}
  },
  deleteCategory: async (req: any, res: any) => {
    try {
      let categoryMatchDate = new Date(req.params.year, req.params.month, 1);
      await Category.findOneAndDelete({
        title: req.params.category,
        date: categoryMatchDate,
      });

      let transactionMatchDate = new Date(
        req.params.year,
        req.params.month,
        req.params.day
      );
      transactionMatchDate = new Date(
        transactionMatchDate.getTime() - 300 * 10000 * 6
      );
      await Transaction.deleteMany({
        user: req.user.id,
        category: req.params.category,
        date: transactionMatchDate,
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  deleteSubcategory: async (req: any, res: any) => {
    try {
      console.log(req.params);
      const date = new Date(
        req.params.year,
        req.params.month,
        1
      )
      console.log(date);
      const updatedCategory = await Category.findOneAndUpdate(
        { user: req.user._id, title: req.params.category, date: date },
        {
          $pull: {
            subcategories: {
              title: req.params.subcategory,
            },
          },
        }
      );

      let transactionMatchDate = new Date(
        req.params.year,
        req.params.month,
        req.params.day
      );
      transactionMatchDate = new Date(
        transactionMatchDate.getTime() - 300 * 10000 * 6
      );

      await Transaction.deleteMany({
        user: req.user.id,
        subcategory: req.params.subcategory,
        date: transactionMatchDate,
      });
      res.send(updatedCategory);
    } catch (err) {
      console.log(err);
    }
  },
  setSubcategoryBudget: async (req: any, res: any) => {
    try {
      const updatedCategory = await Category.findOneAndUpdate(
        { user: req.user._id, title: req.params.category, date: new Date(req.params.year, req.params.month, 1) },
        { $set: { "subcategories.$[el].budget": req.body.budgetAmount } },
        {
          arrayFilters: [{ "el.title": req.params.subcategory }],
        }
      );
      res.send(updatedCategory);
    } catch (err) {
      console.log(err);
    }
  },
};
