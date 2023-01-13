const { questionModel } = require("../models/question.mode");

// to ask any question
const askQuestion = async(req, res) => {
    try {
        // getting required data from body
        let {userId,question,count} = req.body;

        // posting a question
        let newQuestion = await questionModel.create({userId,question,count});

        res.send({
            error:false,
            message:"Your question has been posted!",
            question:newQuestion
        })

    } catch (error) {
        // if there is an internal server error

        return res.status(500).send({
            error: error,
            message: "Something went wrong!"
        });

    }
}

// to get all question
const allQuestions = async (req, res) =>{
    try {
        // finding all question from the database
        let allQuestions = await questionModel.find();

        return res.send({
            error:false,
            data:allQuestions
        })

    } catch (error) {
        // if there is an internal server error

        return res.status(500).send({
            error: error,
            message: "Something went wrong!"
        });

    }
}

// to read a particular question
const readQuestion = async (req, res) =>{
    try {
        // used params so that we can get that particular user
        let {_id} = req.params;

        // finidng question by its id
        let question  = await questionModel.findById({_id});

        // count has been incremented by 1 whenever a user visits the question
        question.count = question.count+1;

        await questionModel.findByIdAndUpdate({_id},{count:question.count});
        return res.send({
            error:false,
            data:question
        })
    } catch (error) {
        // if there is an internal server error
        
        return res.status(500).send({
            error: error,
            message: "Something went wrong!"
        });
    }
}

// to update any question
const updateQuestion = async (req, res) =>{
    try {
        // used params so that we can get that particular user
        let {_id} = req.params;

         // getting required data from body
        let {userId, question} = req.body;
        let existQuestion  = await questionModel.findById({_id});
        

        // checking if that user is only updating their question or not
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
        // if there is an internal server error
        return res.status(500).send({
            error: true,
            message: "Something went wrong!"
        });
    }
}

// to search a question
const searchQuestion = async (req, res) =>{
    try {
        // getting title from query and finding
        let title = req.query.q;
        let question = await questionModel.find({ question:{$regex:title,$options:"$i"} })

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
module.exports = {askQuestion, allQuestions, readQuestion, updateQuestion, searchQuestion}
