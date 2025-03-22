const express = require("express");
const app = express();
const mainRouter = require("./routes/index")
const userRouter = require("./routes/user")

app.use("/api/v1" , mainRouter);

app.use("/api/v1" , userRouter );
// all the req from this route will be passed to the specific router
