const express = require("express");
const { authMiddleware } = require("../middleware");
const { Accounts } = require("../db");
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
    const {amount , to} = req.body;
    //transfers and processes like that should be carried out with atomicity-- it has to be completed otherwise the whole process should just role back
    const account = await Accounts.findOne({
        userId : req.userId
    })

    if(account.balance < amount){
        return res.json({
            msg : "insufficient balance to processs the request"
        })
    }

    const toAccount = await Accounts.findOne({
        userId: to
    })

    if(!toAccount){
        return res.status(400).json({
            msg: "Please a valid account to transfer the money"
        })
    }

    await Accounts.updateOne({
        userId : req.userId
    } , {$inc:{
        balance : -amount 
    }
    })

    await Accounts.updateOne({
        userId : to
    } , {$inc: {
        balance : +amount
    }})

    res.json({
        msg: "Your Transaction was carried out very smoothly --but with a lot of mistakes"
    })
})

module.exports = router;

