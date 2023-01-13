const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config()
const jwt_secret = process.env.JWT_SECRET

const middleware = (req, res, next) => {
    try {
        if(req.url === "/user/register" || req.url === "/user/login"){
            next();
        } else{
            const token = req.header('Authorization');
            if(token){
                const verified = jwt.verify(token, jwt_secret); 
                if(verified){
                    next();
                } else{
                    return res.status(401).send({
                        error: true,
                        message: "Invalid Authorization Token!" 
                    });
                }
            } else{
                return res.status(401).send({
                    error: true,
                    message: "Access Denied"
                });
            }
        }
    } catch (error) {
        if(error.name === "JsonWebTokenError"){
            return res.status(401).send({
                error: true,
                message: error.message 
            });
        }
        return res.status(500).send({
            error: error,
            message: "Something went wrong!"
        });
    }
}

module.exports = middleware