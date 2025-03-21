const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Shiv_2005:Shivanshu192005@cluster0.aw2rp.mongodb.net/");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String ,
        required  :true
    },
    lastName : {
        type : String,
        required : true ,
        
    } ,
    passWord : {type : String,
        required : true ,
        minLength : 8 
    } ,
    email : {
        type : String ,  
        required : true
    }
});

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , // references to the User Model  --- more questions on this
        ref : 'User' ,
        required : true
    } ,
    Balance : {
        type: Number , 
        required : true 
    }
})


const Accounts = mongoose.model("Accounts" , accountSchema);

const User = mongoose.model("Users" , userSchema);


module.exports={
    User ,
    Accounts
}

//transaction in database