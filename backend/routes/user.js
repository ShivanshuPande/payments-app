const express = require("express") ;
const zod = require("zod");
const { User, User } = require("../db");
const jwt = ("jsonwebtoken")
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const signSchema = zod.object({
    username : zod.string(),
    firstName : zod.string(),
    lastname : zod.string(),
    password  :zod.number()
    
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


    const dbUser = await User.create({
        username: req.body.username,
        password : req.body.password,
        firstName:req.body.firstName,
        lastname : req.body.lastname
    });
    const userId = dbUser._id
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({
        message : "User Created successfully",
        token : token
    })
})

router.post("/signin" ,async (req,res)=>{

    const signinSchema = zod.object({
        username:zod.string(),
        password : zod.number()
    })

    const success = signinSchema.safeParse(req.body);

    if(!success){
        res.json({
            message: "Please enter Correct inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    });

    if(!user){
        res.status(401).json()({
            message: "Error logging in please enter correct inputs"
        })
    }

    const userId = user._id;
    const token = jwtsign({
        userId
    },JWT_SECRET)

    res.status(200).json({
        message:"Welcome back to the website",
        token : token
    })
})

router.put("/api/v1/user" , authMiddleware , (req, res)=>{
    
})

module.exports = router;