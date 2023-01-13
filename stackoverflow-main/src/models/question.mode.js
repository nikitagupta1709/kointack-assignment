const mongoose = require('mongoose');

// question schema made for mongoDB 
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    count:{
        type: Number,
        default: 0
    },
    answers:{
        type:Array,
        default:[]
    }

},{timestamps:true, versionKey:false});
module.exports.questionModel = mongoose.model("questions", questionSchema);

