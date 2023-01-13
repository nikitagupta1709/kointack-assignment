const express = require('express');
const { submitAnswer } = require('../controllers/answer.controller');

const answerRouter = express.Router();

answerRouter.post("/submit/:_id",submitAnswer);

module.exports = answerRouter;