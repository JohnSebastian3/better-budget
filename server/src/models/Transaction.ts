import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const TransactionSchema = new Schema({
  title: String,
  category: String,
  value: Number,
  isIncome: Boolean,
  date: Date,
  user: String
})

const TransactionModel = mongoose.model('Transaction', TransactionSchema);
export default TransactionModel;