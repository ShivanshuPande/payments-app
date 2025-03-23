// const express = require("express");
// const app = express();
// const userRouter = require("./user")
// const  accountRouter =  require("./accounts")


// const router = express.Router();

// app.use("/users" ,userRouter );
// app.use("/account" , accountRouter)
// module.exports = router ;

// routes/index.js
const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./accounts");

const router = express.Router();

router.use("/users", userRouter);
router.use("/account", accountRouter);

module.exports = router;
