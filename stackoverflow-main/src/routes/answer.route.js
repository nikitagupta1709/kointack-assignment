const express = require('express');
const { submitAnswer } = require('../controllers/answer.controller');

// all routes related to answer route
const answerRouter = express.Router();

// post request is made in this route  for submitting an answer with a given question id
answerRouter.post("/submit/:_id",submitAnswer);

module.exports = answerRouter;