const express = require('express');
const { askQuestion, allQuestions, readQuestion, updateQuestion } = require('../controllers/question.controller');

const questionRouter = express.Router();

questionRouter.post("/ask", askQuestion);

questionRouter.get("/", allQuestions);

questionRouter.get("/read/:_id", readQuestion);

questionRouter.patch("/update/:_id", updateQuestion);

module.exports = questionRouter;