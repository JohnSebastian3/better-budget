import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
  categories: [String],
  user: mongoose.Types.ObjectId,
})

const DashboardModel = mongoose.model('Dashboard', DashboardSchema);
export default DashboardModel;