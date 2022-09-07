import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
  email: string;
  avatar: string;
  name: string;
  password: string;
  ingredients: string[];
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  ingredients: {
    type: Array,
  },
  favorites: {
    type: Array
  }
});

export default mongoose.model<UserDocument>("User", UserSchema);
