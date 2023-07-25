const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'users'
    },
    content: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("goals", GoalSchema);
