// const express = require("express");
// const router = express.Router();
// const usermodel = require("../models/user")
// router.get("/" , (req,res)=>{
//     res.render("index");
// })
// router.post("/" , async (req,res)=>{
//     let { name , email , password } = req.body
//     let user = await usermodel.create({
//         name:name,
//         email:email,
//         password:password
//     })
//     res.send("user created")
// })
// router.get("/login" , (req,res)=>{
//     res.render("login")
// })
// module.exports = router;
