const express = require('express');
const { askQuestion } = require('../controllers/question.controller');

const questionRouter = express.Router();

questionRouter.post("/ask", askQuestion);
questionRouter.get("/get");

module.exports = questionRouter;