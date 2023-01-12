const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080; // port at which server listening

app.listen(
  PORT,
  console.log(`server started at port ${PORT}`)
);
