const express = require('express');
const {register, login} = require('../controllers/user.controller.js');

// all routes related to user route
const userRouter = express.Router();

// post request is made in this route for registering a user
userRouter.post("/register", register);

// post request is made in this route for logging a user
userRouter.post("/login", login);

module.exports = userRouter;