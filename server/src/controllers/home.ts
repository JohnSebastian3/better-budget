import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { DatabaseUserInterface } from "../interfaces/UserInterface";
import mongoose from "mongoose";
import Category from "../models/Category";
module.exports = {
  registerUser: async (req: any, res: any) => {
    const { email, username, password } = req?.body;
    if (
      !email ||
      !username ||
      !password ||
      typeof email !== "string" ||
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      res.send("Improper values");
    }

    User.findOne({ email }, async (err: Error, doc: DatabaseUserInterface) => {
      if (err) throw err;
      if (doc) res.send("Email already registered");
      if (!doc) {
        User.findOne(
          { username },
          async (err: Error, doc: DatabaseUserInterface) => {
            if (err) throw err;
            if (doc) res.send("Username is in use");
            if (!doc) {
              const hashedPassword = await bcrypt.hash(req.body.password, 10);
              const newUser = new User({
                username,
                email,
                password: hashedPassword
              });
              const createdUser = await newUser.save();

              const categoryIncome = new Category({
                title: 'Income',
                subcategories: ['Paychecks'],
                user: new mongoose.Types.ObjectId(createdUser._id)
              })
          
              await categoryIncome.save();

              const categorySpending = new Category({
                title: 'Spending',
                subcategories: ['Groceries'],
                user: new mongoose.Types.ObjectId(createdUser._id)
              })
          
              await categorySpending.save();

              const categoryBills = new Category({
                title: 'Bills',
                subcategories: ['Rent'],
                user: new mongoose.Types.ObjectId(createdUser._id)
              })
          
              await categoryBills.save();

              const categorySubscriptions = new Category({
                title: 'Subscriptions',
                subcategories: ['Streaming'],
                user: new mongoose.Types.ObjectId(createdUser._id)
              })
          
              await categorySubscriptions.save();

              const categoryDebt = new Category({
                title: 'Debt',
                subcategories: ['Credit Card'],
                user: new mongoose.Types.ObjectId(createdUser._id)
              })
          
              await categoryDebt.save();

              const categoryGifts = new Category({
                title: 'Gifts',
                subcategories: ['Charity'],
                user: new mongoose.Types.ObjectId(createdUser._id)
              })
          
              await categoryGifts.save();

              res.sendStatus(200);
            }
          }
        );
      }
    });
    
  },
  getUser: (req: any, res: Response) => {
    res.send(req.user);
  },
  logoutUser: (req: any, res: any) => {
    req.logout((err: Error) => {
      if (err) return err.message;
      res.sendStatus(200);
    });
  },
};
