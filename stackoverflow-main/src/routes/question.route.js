const express = require('express');
const { askQuestion, allQuestions, readQuestion, updateQuestion, searchQuestion } = require('../controllers/question.controller');

// all routes related to question route
const questionRouter = express.Router();

// post request is made in this route for asking a question 
questionRouter.post("/ask", askQuestion);

// get request is made in this route for getting all Questions list 
questionRouter.get("/", allQuestions);

// get request is made in this route for reading a question with a given question id
questionRouter.get("/read/:_id", readQuestion);

// patch request is made in this route for updating a question with a given question id
questionRouter.patch("/update/:_id", updateQuestion);

// patch request is made in this route for searching a question 
questionRouter.get("/search", searchQuestion);

module.exports = questionRouter;