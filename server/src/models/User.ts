import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    required: true,
    min: 8,
    max: 50
  },
  password: {
    type: String,
    min: 6
  },
},);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;