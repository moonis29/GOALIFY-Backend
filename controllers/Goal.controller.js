const GoalModel = require("../models/Goal.model");
const mongoose = require("mongoose");

/**
 * Route          /getAllGoals
 * Description    Get All Goals
 * Access         PUBLIC
 * parameter
 * Method         GET
 */

const getAllGoals = async (req, res) => {
  try {
    const allGoals = await GoalModel.find();
    res.status(200).json({
      status: "Success",
      TotalResults: allGoals.length,
      data: allGoals,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

/**
 * Route          /addGoal
 * Description    Add new Goal
 * Access         PUBLIC
 * parameter
 * Method         POST
 */
const addNewGoal = async (req, res) => {
  try {
    const { content, priority } = req.body;
    const newGoal = new GoalModel({
      content,
      priority,
      user: req.user.id,
    });

    await newGoal.save();
    res.status(201).json({
      status: "Success",
      data: newGoal,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

/**
 * Route          /updateGoal
 * Description    Update a Goal
 * Access         PUBLIC
 * parameter      _id
 * Method         PUT
 */

const updateGoal = async (req, res) => {
  try {
    const goalID = req.params.id;

    //Ckeck whether the ObjectId is of Valid length or not
    if (!mongoose.isValidObjectId(goalID)) {
      return res.status(400).json({
        status: "Failed",
        error: "Invalid ObjectId",
      });
    }
    const existingGoal = await GoalModel.findById(goalID);

    //Check whether the goal assosiated with the provided ObjectId exists or not
    if (!existingGoal) {
      return res.status(404).json({
        status: "Failed",
        error: "Goal Not Found",
      });
    }

    const updatedGoal = await GoalModel.findByIdAndUpdate(goalID, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "Success",
      data: updatedGoal,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

/**
 * Route          /deleteGoal
 * Description    Delete a Goal
 * Access         PUBLIC
 * parameter      _id
 * Method         DELETE
 */
const deleteGoal = async (req, res) => {
  try {
    const goalID = req.params.id;

    if (!mongoose.isValidObjectId(goalID)) {
      return res.status(400).json({
        status: "Failed",
        error: "Invalid ObjectId",
      });
    }

    const existingGoal = await GoalModel.findById(goalID);

    if (!existingGoal) {
      return res.status(404).json({
        status: "Failed",
        error: "Goal Not Found",
      });
    }

    await existingGoal.deleteOne();
    res.status(200).json({
      status: "Success",
      data: goalID,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

module.exports = { getAllGoals, addNewGoal, updateGoal, deleteGoal };
