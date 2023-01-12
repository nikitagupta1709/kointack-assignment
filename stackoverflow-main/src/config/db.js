const mongoose =  require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

mongoose.set('strictQuery', false);

let mongo_url = process.env.MONGO_URL;

const connection = async() => {
    try {
        await mongoose.connect(mongo_url,{
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        console.log("Connection established");
    } catch (error) {
        console.log(error)
    }
}
module.exports = {connection};
