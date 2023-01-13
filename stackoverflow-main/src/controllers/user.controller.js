const { userModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken") ;
const dotenv = require("dotenv") ;

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// register
const register = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        var mailformat =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if(email.match(mailformat)){
            let userExists = await userModel.findOne({email});
            let usernameExists = await userModel.findOne({username});
            if(userExists){
                return res.status(400).send({
                    status: false,
                    message: 'User already exists!'
                })
            } else if(usernameExists){
                return res.status(400).send({
                    status: false,
                    message: 'Username already taken'
                })
            } else{
                password = bcrypt.hashSync(password);
                let newUser = await userModel.create({email, password, username});
                newUser = newUser.toJSON();
                delete newUser.password;
                return res.send({
                    message: 'User successfully registered.',
                    data: newUser
                });
            }
        } else{
            return res.send({
                error:true,
                message: "You have entered an invalid email address!"
            })
        }
    } catch (error) {
        res.status(500).send({
            error:error,
            message: "Something went wrong!"
        })
    }
    
}

// login
const login = async(req, res) => {
    try {
        const user = req.body
        let {username, password} = user;

        let userExists = await userModel.findOne({username});
        if(userExists){
            let match = bcrypt.compareSync(password, userExists.password);
            if(match){
                let token = jwt.sign({
                    _id : userExists._id,
                    username: userExists.username,
                    email: userExists.email
                },JWT_SECRET)
                // Verifying...
                let result = jwt.verify(token, JWT_SECRET);
                // Decoding...
                result = jwt.decode(token);
                return res.send({
                    message:"Succesfully logged in",
                    data : token,
                    user: userExists
                })
            } else{
                return res.status(400).send({
                    status: false,
                    message: 'Incorrect password !'
                })
            }
        } else{
            return res.status(400).send({
                status: false,
                message: 'User does not exists'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error
        });
    }
}

module.exports = {register, login};