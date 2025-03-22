    const express = require("express") ;
    const zod = require("zod");
    const { User, Accounts } = require("../db");
    const jwt = require("jsonwebtoken")
    const {JWT_SECRET} = require("../config");
    const { authMiddleware } = require("../middleware");

    const signSchema = zod.object({
        username : zod.string(),
        firstName : zod.string(),
        lastName : zod.string(),
        password  :zod.number()
        
    })
    const signinSchema = zod.object({
        username:zod.string(),
        password : zod.number()
    })

    const updateBody = zod.object({
        password:zod.number().optional(),
        firstName:zod.string().optional(),
        lastName: zod.string().optional()
    })
    const router = express.Router();

    router.post("/signup" , async(req,res)=>{
        const body = req.body;
        const parsedval = signSchema.safeParse(req.body);
        if(!parsedval.success){
            return res.json({
                message:"Email already taken/ Please enter a valid input"
            })
        }

        const user = await User.findOne({
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
            lastName : req.body.lastName
        });

        const userId = dbUser._id

        const Accounts = await Accounts.create({
            userId ,
            balance : 1 + Math.random *
        })
        const token = jwt.sign({
            userId
        }, JWT_SECRET)
        res.json({
            message : "User Created successfully",
            token : token
        })
    })

    router.post("/signin" ,async (req,res)=>{

        
        const {success} = signinSchema.safeParse(req.body);

        if(!success){
            return res.json({
                message: "Please enter Correct inputs"
            })
        }

        const user = await User.findOne({
            username : req.body.username,
            password : req.body.password
        });

        if(!user){
            return res.status(401).json({
                message: "Error logging in please enter correct inputs"
            })
        }

        const userId = user._id;
        const token = jwt.sign({
            userId
        },JWT_SECRET)

        return res.status(200).json({
            message:"Welcome back to the website",
            token : token
        })
    })

    router.put("/user" , authMiddleware , async(req, res)=>{
        

        const {success} = updateBody.safeParse(req.body);
        if(!success){
            res.status(403).json({
                message : "Error while updating the information "
            })
        }

        await User.updateOne({_id : req.userId} ,{$set :req.body})

        res.status(200).json({
            message : "updated the info"
        })
    })
    //query para --here
    // sql query --- SELECT * FROM  users WHERE name LIKE %poke%
    router.get("/bulk" , authMiddleware , async (req ,res) =>{
        const filter  = req.query.filter || " ";

        const users = await User.find({
            $or :[{
                firstName : {
                    "$regex"  : filter
                }
            } , {
                lastName : {
                    "$regex" : filter
                }
            }]
        })

        res.json({
            user : users.map(user =>({
                username : user.username ,
                firstName : user.firstName ,
                lastName : user.lastName,
                _id : user._id 
            }))
        })
    })

    module.exports = router;
