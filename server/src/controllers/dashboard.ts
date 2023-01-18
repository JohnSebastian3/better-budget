import Category from "../models/Category";
import Transaction from "../models/Transaction";
import Subcategory from "../models/Category";
import mongoose, { Mongoose, Schema } from "mongoose";
import CategoryModel from "../models/Category";
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
        dateDay: req.body.dateDay,
        dateMonth: req.body.dateMonth,
        dateYear: req.body.dateYear,
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
      const resArr: any[] = [];

      const categoryIncome = new Category({
        title: "Income",
        subcategories: [
          {
            title: "Paychecks",
            budget: 0,
            dateMonth: Number(req.body.month),
            dateYear: Number(req.body.year),
          },
        ],
        dateMonth: Number(req.body.month),
        dateYear: Number(req.body.year),
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      resArr.push(categoryIncome);

      await categoryIncome.save();

      const categorySpending = new Category({
        title: "Spending",
        subcategories: [
          {
            title: "Groceries",
            budget: 0,
            dateMonth: Number(req.body.month),
            dateYear: Number(req.body.year),
          },
        ],
        dateMonth: Number(req.body.month),
        dateYear: Number(req.body.year),
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      resArr.push(categorySpending);

      await categorySpending.save();

      const categoryBills = new Category({
        title: "Bills",
        subcategories: [
          {
            title: "Rent",
            budget: 0,
            dateMonth: Number(req.body.month),
            dateYear: Number(req.body.year),
          },
        ],
        dateMonth: Number(req.body.month),
        dateYear: Number(req.body.year),
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      resArr.push(categoryBills);

      await categoryBills.save();

      const categorySubscriptions = new Category({
        title: "Subscriptions",
        subcategories: [
          {
            title: "Streaming",
            budget: 0,
            dateMonth: Number(req.body.month),
            dateYear: Number(req.body.year),
          },
        ],
        dateMonth: Number(req.body.month),
        dateYear: Number(req.body.year),
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      resArr.push(categorySubscriptions);

      await categorySubscriptions.save();

      const categoryDebt = new Category({
        title: "Debt",
        subcategories: [
          {
            title: "Credit Card",
            budget: 0,
            dateMonth: Number(req.body.month),
            dateYear: Number(req.body.year),
          },
        ],
        dateMonth: Number(req.body.month),
        dateYear: Number(req.body.year),
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      resArr.push(categoryDebt);

      await categoryDebt.save();

      const categoryGifts = new Category({
        title: "Gifts",
        subcategories: [
          {
            title: "Charity",
            budget: 0,
            dateMonth: Number(req.body.month),
            dateYear: Number(req.body.year),
          },
        ],
        dateMonth: Number(req.body.month),
        dateYear: Number(req.body.year),
        user: new mongoose.Types.ObjectId(req.user._id),
      });

      resArr.push(categoryGifts);

      await categoryGifts.save();

      res.send(resArr);
    } catch (err) {
      console.log(err);
    }
  },
  addCategory: async (req: any, res: any) => {
    try {
      let newCategory = new Category({
        title: req.body.newCategory.title,
        user: new mongoose.Types.ObjectId(req.user.id),
        dateMonth: Number(req.body.newCategory.dateMonth),
        dateYear: Number(req.body.newCategory.dateYear),
      });

      await newCategory.save();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  addSubcategory: async (req: any, res: any) => {
    try {
      let category = req.params.category;
      if(category.includes('&dash')) {
        category = category.replace('&dash', '/');
      }
      await Category.findOneAndUpdate(
        {
          user: req.user._id,
          title: category,
          dateMonth: Number(req.body.subcategory.dateMonth),
          dateYear: Number(req.body.subcategory.dateYear),
        },
        {
          $push: {
            subcategories: {
              title: req.body.subcategory.title,
              budget: Number(req.body.subcategory.budget),
              dateMonth: Number(req.body.subcategory.dateMonth),
              dateYear: Number(req.body.subcategory.dateYear),
            },
          },
        }
      );

      res.sendStatus(200);
    } catch (err) {}
  },
  deleteCategory: async (req: any, res: any) => {
    try {
      let category = req.params.category;

      if(category.includes('&dash')) {
        category = category.replace('&dash', '/');
      }
      console.log(category);
      await Category.findOneAndDelete({
        title: category,
        dateMonth: Number(req.params.month),
        dateYear: Number(req.params.year),
      });

      await Transaction.deleteMany({
        user: req.user.id,
        category: category,
        dateDay: Number(req.params.day),
        dateMonth: Number(req.params.month),
        dateYear: Number(req.params.year),
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  deleteSubcategory: async (req: any, res: any) => {
    try {
      let category = req.params.category;
      let subcategory = req.params.subcategory;
      if(category.includes('&dash')) {
        category = category.replace('&dash', '/');
      }

      if(subcategory.includes('&dash')) {
        subcategory = subcategory.replace('/&dash', '/');
      }
      const updatedCategory = await Category.findOneAndUpdate(
        {
          user: req.user._id,
          title: category,
          dateMonth: Number(req.params.month),
          dateYear: Number(req.params.year)
        },
        {
          $pull: {
            subcategories: {
              title: subcategory,
            },
          },
        }
      );

      await Transaction.deleteMany({
        user: req.user.id,
        category: category,
        subcategory: subcategory,
        dateMonth: req.params.month,
        dateYear: req.params.year,
      });
      res.send(updatedCategory);
    } catch (err) {
      console.log(err);
    }
  },
  setSubcategoryBudget: async (req: any, res: any) => {
    try {
      let category = req.params.category;
      let subcategory = req.params.subcategory;
      if(category.includes('&dash')) {
        category = category.replace('&dash', '/');
      }

      if(subcategory.includes('&dash')) {
        subcategory = subcategory.replace('&dash', '/');
      }
      const updatedCategory = await Category.findOneAndUpdate(
        {
          user: req.user._id,
          title: category,
          dateMonth: req.params.month,
          dateYear: req.params.year
        },
        { $set: { "subcategories.$[el].budget": req.body.budgetAmount } },
        {
          arrayFilters: [{ "el.title": subcategory }],
        }
      );
      res.send(updatedCategory);
    } catch (err) {
      console.log(err);
    }
  },
  deleteTransaction: async (req: any, res: any) => {
    try {
      await Transaction.findOneAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)});
      console.log('should be deleted');
      res.sendStatus(200);
    } catch(err) {
      console.log(err);
    } 
  }
};
