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

const allQuestions = async (req, res) =>{
    try {
        let allQuestions = await questionModel.find();
        return res.send({
            error:false,
            data:allQuestions
        })
    } catch (error) {
        return res.status(500).send({
            error: error,
            message: "Something went wrong!"
        });
    }
}

const readQuestion = async (req, res) =>{
    try {
        let {_id} = req.params;
        let question  = await questionModel.findById({_id});
        question.count = question.count+1;
        await questionModel.findByIdAndUpdate({_id},{count:question.count});
        return res.send({
            error:false,
            data:question
        })
    } catch (error) {
        return res.status(500).send({
            error: error,
            message: "Something went wrong!"
        });
    }
}

const updateQuestion = async (req, res) =>{
    try {
        let {_id} = req.params;
        let {userId, question} = req.body;

        let existQuestion  = await questionModel.findById({_id});

        if(userId === existQuestion.userId){
            existQuestion.question = question
            await questionModel.findByIdAndUpdate({_id},{question:existQuestion.question});
            return res.send({
                error:false,
                data:existQuestion
            })
        } else{
            return res.send({
                error: true,
                message: "You can not updated others question!"
            });
        }
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: "Something went wrong!"
        });
    }
}

module.exports = {askQuestion, allQuestions, readQuestion, updateQuestion}
