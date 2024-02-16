//import logic from userController
const { createQuestions, getAllQuestions } = require("../controller/questionController");
const { userSignup, userLogin } = require("../controller/userController");
//import express
const express = require('express');
const userRoute = express.Router();


//signup route
userRoute.post("/signup", userSignup);
//login route
userRoute.post("/login", userLogin);

//questions route
userRoute.post("/create-question",createQuestions);

userRoute.get("/get-all-questions",getAllQuestions);

module.exports = userRoute;
