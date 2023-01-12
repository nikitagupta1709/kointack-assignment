const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionname: {
        type: String,
        required: true
    }
},{timestamps:true, versionKey:false});
module.exports.questionModel = mongoose.model("questions", questionSchema);

