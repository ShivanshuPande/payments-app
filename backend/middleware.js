const JWT_SECRET = require("./config")
const jwt = require("jsonwebtoken")

const authMiddleware =()=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json()
    }
     

    const token = authHeader.split('')[1];
    try{
        const decoded = jwt.verify(token ,JWT_SECRET);
        
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else{
            res.status(403).json({
                message : "invalid token"
            })
        }
        

    }catch(err){
        return res.status(403).json({
            message : "some error"
        })
    }
};

module.exports={
    authMiddleware 
}

