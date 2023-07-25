const express = require("express");
const router = express.Router();
const {
  getAllGoals,
  addNewGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/Goal.controller");
const { isAuthorized } = require("../middleware/auth.middleware");

router.get("/getAllGoals", isAuthorized, getAllGoals);

router.post("/addGoal", isAuthorized, addNewGoal);

router.put("/updateGoal/:id", isAuthorized, updateGoal);

router.delete("/deleteGoal/:id", isAuthorized, deleteGoal);

module.exports = router;
