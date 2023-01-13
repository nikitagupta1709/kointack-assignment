const { questionModel } = require("../models/question.mode");

const askQuestion = async(req, res) => {
    try {
        let {userId,question,count} = req.body;
        let newQuestion = await questionModel.create({userId,question,count});
        res.send({
            error:false,
            message:"Your question has been posted!",
            question:newQuestion
        })
    } catch (error) {
        return res.status(500).send({
            error: error,
            message: "Something went wrong!"
        });
    }
}

module.exports = {askQuestion}