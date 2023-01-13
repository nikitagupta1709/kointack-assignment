const mongoose = require('mongoose');

// user schema made for mongoDB 

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true, versionKey:false});
module.exports.userModel = mongoose.model("users", userSchema);
