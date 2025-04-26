const express = require("express");
const ownermodel = require("../models/user")
const router = express.Router();
router.get("/" , (req,res)=>{
    res.send("hello owners :) ");
})
router.post("/create" , async (req,res)=>{
    let { name , email , password } = req.body
    let owners = await ownermodel.find({email:email})
    console.log(owners)
    if(owners.length > 0){
        res.send("Cant create more users with the same Email ID ");
    }
    else{
        let owner = await ownermodel.create({
            name : name , 
            email : email , 
            password : password
        })
        res.send("owner created")
    }
})
router.get("/admin" , (req,res)=>{
    res.render("createproduct" , {messages:req.flash()} )
})

module.exports = router;
 