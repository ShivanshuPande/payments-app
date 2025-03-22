const express = require("express");
const { authMiddleware } = require("../middleware");
const { Accounts } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const app = express();
router.use(express.json())


const transferSchema = zod.object({
    to:string(),
    amount :number()
})

router.get("/balance" ,authMiddleware, async (req,res) => {
    const holder = await Accounts.findOne({
        userId : req.userId
    })

    if(!holder){
        res.json({
            msg:  "User not found"
        })
    }
    res.json({  
        balance : holder.balance
    })

})

router.post("/transfer" , async(req, res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount , to} = req.body;
    //transfers and processes like that should be carried out with atomicity-- it has to be completed otherwise the whole process should just role back
    const account = await Accounts.findOne({
        userId : req.userId
    }).session(session)

    if(account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg : "insufficient balance to processs the request"
        })
    }

    const toAccount = await Accounts.findOne({
        userId: to
    }).session(session)

    if(!toAccount){
        session.abortTransaction();
        return res.status(400).json({
            msg: "Please a valid account to transfer the money"
        })
    }

    await Accounts.updateOne({
        userId : req.userId
    } , {$inc:{
        balance : -amount 
    }
    }).session(session);

    await Accounts.updateOne({
        userId : to
    } , {$inc: {
        balance : +amount
    }}).session(session);
    await session.commitTransaction();
    res.json({
        msg: "Your Transaction was carried out very smoothly --but with a lot of mistakes"
    })
})

module.exports = router;

