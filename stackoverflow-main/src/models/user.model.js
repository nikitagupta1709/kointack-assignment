const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
},{timestamps:true, versionKey:false});
module.exports.userModel = mongoose.model("users", userSchema);

// const mongoose = require('mongoose');

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         unique: true,
//         required: true,
//         validate: [validateEmail, 'Please fill a valid email address'],
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//     }
// },{timestamps:true, versionKey:false});
// module.exports.userModel = mongoose.model("users", userSchema);