const express = require('express');
const register = require('../controllers/user.controller.js');

const userRouter = express.Router();

userRouter.post("/register", register);

module.exports = userRouter;