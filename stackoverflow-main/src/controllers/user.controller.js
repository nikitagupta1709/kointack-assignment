const { userModel } = require("../models/user.model");

// Bcrypt turns a simple password into fixed-length characters called a hash. 
const bcrypt = require("bcryptjs"); 

// JWT is a compact URL-safe means of representing claims to be transferred between two parties
const jwt = require("jsonwebtoken") ;

const dotenv = require("dotenv") ;

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// register
const register = async(req, res) => {
    try {
        // getting required data from body
        let {username, email, password} = req.body;

        // a validator to check for valid email format
        var mailformat =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // if email matches with the given format then following is executed
        if(email.match(mailformat)){

            // finding if any email already exist in the database
            let userExists = await userModel.findOne({email});
            
            // finding if any username already exist in the database
            let usernameExists = await userModel.findOne({username});

            if(userExists){
                // if any email does not exist in the database then folowing is executed

                return res.status(400).send({
                    status: false,
                    message: 'User already exists!'
                })

            } else if(usernameExists){
                // if any usernameExists does not exist in the database then folowing is executed

                return res.status(400).send({
                    status: false,
                    message: 'Username already taken'
                })

            } else{
                // password is bcrypted
                password = bcrypt.hashSync(password);

                // created a new user
                let newUser = await userModel.create({email, password, username});
                newUser = newUser.toJSON();

                // deleted passowrd so that it won't be visible in the database
                delete newUser.password;

                return res.send({
                    message: 'User successfully registered.',
                    data: newUser
                });
            }
        } 
        // if email does not matches with the given format then following is executed
        else{
            return res.send({
                error:true,
                message: "You have entered an invalid email address!"
            })
        }
    } catch (error) {
        // if there is an internal server error

        res.status(500).send({
            error:error,
            message: "Something went wrong!"
        })
    }
    
}

// login
const login = async(req, res) => {
    try {
        // acquiring username and password credentials from body
        const user = req.body
        let {username, password} = user;

        // finding if any username already exist in the database
        let userExists = await userModel.findOne({username});

        // if any userExists exist in the database then folowing is executed
        if(userExists){
            // we have matched both the passwords, one that the user posts and the other that is in the database for that user
            let match = bcrypt.compareSync(password, userExists.password);

            if(match){
                // managed a toke by jwt

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
        } 
        // if any userExists does not exist in the database then folowing is executed
        else{
            
            return res.status(400).send({
                status: false,
                message: 'User does not exists'
            })
            
        }
    } catch (error) {
        // if there is an internal server error
        res.status(500).send({
            message: error
        });
    }
}

module.exports = {register, login};