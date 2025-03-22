const express = require("express") ;
const zod = require("zod");
const { User } = require("../db");
const jwt = ("jsonwebtoken")
const JWT_SECRET = require("../config");

const signSchema = zod.object({
    username : zod.string(),
    lastname : zod.string(),
    firstName : zod.string(),
    password  :zod.string()
    
})
const router = express.Router();

router.post("/signup" , async(req,res)=>{
    const body = req.body;
    const {success} = signSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message:"Email already taken/ Please enter a valid input"
        })
    }

    const user = User.findOne({
        username : body.username
    })

    if(user){
        return res.json({
            message :"Username already taken /please enter a new one"
        })
    }


    const dbUser = await User.create(body);
    const userId = dbUser._id
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({
        message : "User Created successfully",
        token : token
    })
})

module.exports = router;