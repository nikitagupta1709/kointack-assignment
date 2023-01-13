const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./config/db.js");
const userRouter = require("./routes/user.route.js");
const questionRouter = require("./routes/question.route.js");
const answerRouter = require("./routes/answer.route.js");
const middleware = require("./middleware/index.js");

dotenv.config();
const app = express();

app.use(express.json());

// cors is used to allow a server to indicate any origins 
// (domain, scheme, or port) other than its own from which 
// a browser should permit loading resources.
app.use(cors());

app.use(middleware);

app.get("/", (req, res)=>{
  res.send("Stackoverflow");
})

const PORT = process.env.PORT || 8080; // port at which server listening

// to use user router 
app.use("/user", userRouter);

// to use question router 
app.use("/question", questionRouter);

// to use answer router 
app.use("/answer", answerRouter);

app.listen(PORT,()=>{
  try {
    // to connect to mongoose database using this function
    connection();
    console.log(`server started at port ${PORT}`)
  } catch (error) {
    // to catch any internal error
    console.log(error)
  }
});

