const express = require("express");
const app = express();
import userRouter from "./user";
import accountRouter from "./accounts"
const cors = require("cors");
app.use(cors());
app.use(express.json())

const router = express.Router();

app.use("/users" ,userRouter );
app.use("/account" , accountRouter)
module.exports = router ;