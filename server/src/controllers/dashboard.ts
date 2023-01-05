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
        date: req.body.date,
        user: req.user.id,
      });
      const createdTransaction = await newTransaction.save();
      res.json(createdTransaction);
    } catch (err) {
      console.log(err);
    }
  },
  addCategory: async (req: any, res: any) => {
    try {
      console.log(req.body);
      let newCategory = new Category({
        title: req.body.newCategory.title,
        subcategories: {
          titles: req.body.newCategory.subcategories.titles,
          budget: 0,
        },
        user: new mongoose.Types.ObjectId(req.user.id),
      });

      await newCategory.save();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  addSubcategory: async (req: any, res: any) => {
    try {
      await Category.findOneAndUpdate(
        { user: req.user._id, title: req.params.category },
        {
          $push: {
            subcategories: {
              title: req.body.subcategory.title,
              budget: Number(req.body.subcategory.budget),
            },
          },
        },
      );
      
      res.sendStatus(200);
    } catch (err) {}
  },
  deleteCategory: async (req: any, res: any) => {
    try {
    await Category.findOneAndDelete({ title: req.params.category });
      await Transaction.deleteMany({
        user: req.user.id,
        category: req.params.category,
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  deleteSubcategory: async (req: any, res: any) => {
    try {
      const updatedCategory = await Category.findOneAndUpdate(
        { user: req.user._id, title: req.params.category },
        {
          $pull: {
            subcategories: {
              title: req.params.subcategory
            }
          },
        },
      );
      await Transaction.deleteMany({
        user: req.user.id,
        subcategory: req.params.subcategory,
      });
      res.send(updatedCategory);
    } catch (err) {
      console.log(err);
    }
  },
  setSubcategoryBudget: async (req: any, res: any) => {
    try {
      await Category.findOneAndUpdate(
        { user: req.user._id, title: req.params.category },
        {
          $set: {
            subcategories: {},
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
