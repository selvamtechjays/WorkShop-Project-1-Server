//import logic from userController
const { userSignup, userLogin } = require("../controller/userController");
//import express
const express = require('express');
const userRoute = express.Router();


//signup route
userRoute.post("/signup", userSignup);
//login route
userRoute.post("/login", userLogin);

module.exports = userRoute;
