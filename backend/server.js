const express = require("express");
const app = express();
const port= 3000;

app.use(express.json());

app.get("/" , (req , res) =>{
 
})

app.post("/" , (req,res)=>{

})

app.put("/" ,  (req , res)=>{

}) 

app.delete("/" ,  (req , res)=>{
    
}) 

app.listen(port , ()=>console.log(`The backend is running on the port ${port}`))