const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./config/db.js");
const userRouter = require("./routes/user.route.js");
const questionRouter = require("./routes/question.route.js");
const answerRouter = require("./routes/answer.route.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
  res.send("Stackoverflow");
})

const PORT = process.env.PORT || 8080; // port at which server listening

app.use("/user", userRouter);
app.use("/question", questionRouter);
app.use("/answer", answerRouter);

app.listen(PORT,()=>{
  try {
    connection();
    console.log(`server started at port ${PORT}`)
  } catch (error) {
    console.log(error)
  }
});

