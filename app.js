const express = require ("express")
const app = express()
const path = require("path")
const db = require("./config/mongoose-connection")
const ownerRouter = require("./routes/ownerRouter")
const usersRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productRouter")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname,"public")))
app.get("/" , (req,res)=>{
    res.send('hello')
})
app.use("/owners" , ownerRouter)
app.use("/users" , usersRouter)
app.use("/products" ,productsRouter)
app.listen(7000, ()=>{
    console.log("server is running on port 7000")
})
 