const express = require("express");
const cors = require("cors")
const app = express();
const mainRouter = require("./routes/index");
app.use(cors());
app.use(express.json());    

app.use("/api/v1" , mainRouter);

app.listen(3000 , ()=>console.log(`server is running on port 3000`))


// all the req from this route will be passed to the specific router
