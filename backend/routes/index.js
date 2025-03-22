const express = require("express");
const app = express();
import userRouter from "./user";
const cors = require("cors");
app.use(cors());
app.use(express.json())

const router = express.Router();

app.use("/users" ,userRouter );

module.exports = router ;