import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  title: String,
  category: String,
  subcategory: String,
  value: Number,
  isIncome: Boolean,
  dateDay: Number,
  dateMonth: Number,
  dateYear: Number,
  user: mongoose.Types.ObjectId,
})

const TransactionModel = mongoose.model('Transaction', TransactionSchema);
export default TransactionModel;