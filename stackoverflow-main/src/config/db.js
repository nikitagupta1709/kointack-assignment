const mongoose =  require("mongoose")
const dotenv = require("dotenv");
// dotenv allows us to create environment variables in a .env file instead of putting them in our code.
dotenv.config();

mongoose.set('strictQuery', false);

let mongo_url = process.env.MONGO_URL;

const connection = () => {
    try {
        // we use mongoose.connect for connecting it to my mongodb
        
        mongoose.connect(mongo_url,{
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        console.log("Connection established");
    } catch (error) {
        console.log(error)
    }
}
module.exports = {connection};
