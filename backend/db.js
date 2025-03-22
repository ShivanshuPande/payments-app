const mongoose = require("mongoose");
const { boolean } = require("zod");
mongoose.connect("mongodb+srv://Shiv_2005:Shivanshu192005@cluster0.aw2rp.mongodb.net/")

const dbSchema = new mongoose.Schema({
    firstName : String,
    lastName : String ,
    password : String
})

const User = mongoose.model("User" , dbSchema);


module.exports={
    User
}