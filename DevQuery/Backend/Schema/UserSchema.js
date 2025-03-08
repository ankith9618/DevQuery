import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  repliesCount:{
    type:Number,
    default:0
  },
  followers:{
    type:Number,
    default:0
  },
  queries: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Query",
    },
  ],
});

const User = mongoose.model("User", userSchema, "Users");

export default User;
