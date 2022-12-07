import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const ExpenseSchema = new Schema({
  title: String,
  category: String,
  value: Number,
  date: Date,
  user: String
})

const ExpenseModel = mongoose.model('Expense', ExpenseSchema);
export default ExpenseModel;