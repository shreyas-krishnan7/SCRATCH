const express = require ("express")
const app = express()
const cookie = require("cookie-parser")
const path = require("path")
const expressSession = require("express-session")
const flash = require("connect-flash")
const db = require("./config/mongoose-connection")
const ownerRouter = require("./routes/ownerRouter")
const usersRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productRouter")
require("dotenv").config()
// const slashRouter = require("./routes/slashRouter")
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
    cookie:{
        path:"/"
    }
}))
app.use(cookie())
app.use(flash())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname,"public")))
// app.use("/" , slashRouter)
app.use("/owners" , ownerRouter)
app.use("/users" , usersRouter)
app.use("/products" ,productsRouter)
// app.use((req, res, next) => {
//     res.locals.messages = {
//       success: req.flash('success'),
//       error: req.flash('error')
//     };
//     next();
//   });
  
app.listen(7000, ()=>{
    console.log("server is running on port 7000")
})
 