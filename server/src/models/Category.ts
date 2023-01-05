import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: String,
  subcategories: [{
    title: String,
    budget: Number,
  }],
  user: mongoose.Types.ObjectId,
})

const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;