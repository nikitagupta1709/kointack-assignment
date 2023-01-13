const { questionModel } = require("../models/question.mode");

//submitting an answer
const submitAnswer = async (req, res) => {
    try {
        // used params so that we can get that particular user
        let {_id} = req.params;

        let answerObj = req.body;
        let {userId} = answerObj;

        // getting id question_Id from questionModel
        let question  = await questionModel.findById({_id});

        // checking in answer array, if that user has already answered or not
        let answerAlreadyExistByUser = question.answers.find((user)=>{
            return user.userId === userId;
        })

        // if user has already answered the given question then message is shw=own according to that
        if(answerAlreadyExistByUser){
            return res.send({
                error: true,
                message: "You can submit only one answer!"
            });

        } 
        // if that user has hasn't answered the given question then do follow
        else{
            
            // updating the answer array with an answer object
            question.answers = [...question.answers,answerObj];

            // finding and updating the answer array
            await questionModel.findByIdAndUpdate({_id},{answers:question.answers})        

            res.send({
                error:false,
                message:"Your answer has been posted!",
                data : question
            })

        }
    } catch (error) {
        // if there is an internal server error
        
        return res.status(500).send({
            error: error,
            message: "Something went wrong!"
        });
    }
}

module.exports = {submitAnswer}