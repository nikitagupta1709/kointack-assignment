const { userModel } = require("../models/user.model");

const register = async(req, res) => {
    try {
        let {email} = req.body;
        // var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        // if(email.match(mailformat)){
            let userExists = await userModel.findOne({email});
            if(userExists){
                return res.status(400).send({
                    status: false,
                    message: 'User already exists.'
                })
            } else{
                let newUser = await userModel.create({email});
                newUser = newUser.toJSON();
                return res.send({
                    message: 'User successfully registered.',
                    data: newUser
                });
            }
        // } else{
        //     return res.send({
        //         error:true,
        //         message: "You have entered an invalid email address!"
        //     })
        // }
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = register;