const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter Username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserSchema);
