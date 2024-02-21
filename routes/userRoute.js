//import logic from userController
const {
  createQuestions,
  getAllQuestions,
} = require("../controller/questionController");
const { saveScoreboard, getAllScoreboardData } = require("../controller/score-board-controller");
const {
  userSignup,
  userLogin,
  forgetPassword,
  changePassword,
} = require("../controller/userController");
//import express
const express = require("express");
const userRoute = express.Router();

//signup route
userRoute.post("/signup", userSignup);
//login route
userRoute.post("/login", userLogin);
//forget password route
userRoute.post("/forgetPassword/:email", forgetPassword);
//change password route
userRoute.post("/changePassword/:id", changePassword);
//questions route
userRoute.post("/create-question", createQuestions);
//get all questions route
userRoute.get("/get-all-questions", getAllQuestions);
//score board route
userRoute.post("/save-scoreboard", saveScoreboard);
//get all scoreboard route
userRoute.get("/get-all-scoreboard", getAllScoreboardData);

module.exports = userRoute;
