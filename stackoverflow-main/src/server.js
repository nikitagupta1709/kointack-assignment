const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./config/db.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
  res.send("Server started");
})

const PORT = process.env.PORT || 8080; // port at which server listening

// app.get("/user");
// app.get("/question");
// app.get("/answer");

app.listen(PORT,()=>{
  try {
    connection();
    console.log(`server started at port ${PORT}`)
  } catch (error) {
    console.log(error)
  }
});

