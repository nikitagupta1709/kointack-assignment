const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
},{timestamps:true, versionKey:false});
module.exports.userModel = mongoose.model("users", userSchema);

