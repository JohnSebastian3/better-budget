import Category from "../models/Category";
import Transaction from "../models/Transaction";
import Subcategory from "../models/Category";
import mongoose from "mongoose";
module.exports = {
  getDashboard: async (req: any, res: any) => {
    try {
      if (req.user) {
        const userCategories = await Category.find({user: req.user._id});

        const transactions = await Transaction.find({ user: req.user._id });
        res.send({ transactions, categories: userCategories});
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

      let newCategory = new Category({
        title: req.body.newCategory.title,
        subcategories: req.body.newCategory.subcategories,
        user: new mongoose.Types.ObjectId(req.user.id),
      });

      const createdCategory = await newCategory.save();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  addSubcategory: async (req: any, res: any) => {
    try {
      await Category.findOneAndUpdate(
        {user: req.user._id, title: req.params.category},
        {
          $push: {subcategories: req.body.subcategory}
        }
        )
      
      res.sendStatus(200);
    } catch(err) {
      
    }
  },
  getSubcategories: async (req: any, res: any) => {
    const subcategories = await Subcategory.find({_id: req.user.id, category: req.params.category});
  }
};
