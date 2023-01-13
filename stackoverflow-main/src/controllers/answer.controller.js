const { questionModel } = require("../models/question.mode");

const submitAnswer = async (req, res) => {
    try {
        let {_id} = req.params;
        let answerObj = req.body;
        let {userId} = answerObj;

        let question  = await questionModel.findById({_id});
        let answerAlreadyExistByUser = question.answers.find((user)=>{
            return user.userId === userId;
        })

        if(answerAlreadyExistByUser){
            return res.send({
                error: true,
                message: "You can submit only one answer!"
            });
        } else{
            question.answers = [...question.answers,answerObj];
            await questionModel.findByIdAndUpdate({_id},{answers:question.answers})        
            res.send({
                error:false,
                message:"Your answer has been posted!",
                data : question
            })
        }
    } catch (error) {
        return res.status(500).send({
            error: error,
            message: "Something went wrong!"
        });
    }
}

module.exports = {submitAnswer}