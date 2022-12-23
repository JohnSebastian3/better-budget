import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: String,
  subcategories: [String],
  user: mongoose.Types.ObjectId,
})

const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;