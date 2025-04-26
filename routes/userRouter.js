const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const productmodel = require("../models/product")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const usermodel = require("../models/user")
const {generateToken} = require("../utils/generatetoken");
const isloggedin = require("../middlewares/isloggedin");
router.get("/" , (req,res)=>{
    res.render("index" , {messages:req.flash()});
})
router.post("/register" ,async (req,res)=>{
    try{
        let { name , email , password } = req.body
        let check = await usermodel.findOne({email :email})
        if(check){
            req.flash("error" , "Account Exists")
            res.redirect("/users/")
        }
        else{

            bcrypt.genSalt(10, function(err,salt){
                bcrypt.hash(password , salt , async (err,hash)=>{
                    if(err){
                        res.send(err.message)
                    }
                    let user = await usermodel.create({
                        name:name,
                        email:email,
                        password:hash

                    })
                    let token = generateToken(user);
                     res.cookie("token" , token)
                    //  req.flash("success" , "Account Created Successfully")
                     res.redirect("/users/shop")
                })
            })
           
            

        }

    }catch(err){
        res.send(err.message)
    }
    
})
router.get("/login" , (req,res)=>{
    res.render("login" , {messages:req.flash()})
})
router.post("/loginuser" , async (req,res)=>{
    let { email , password } = req.body;
    let user = await usermodel.findOne({email:email })
    if(!user){
        req.flash("error", "User Doesn't Exist ")
        res.redirect("/users/login")
    }
    else{
        bcrypt.compare(password , user.password , async(err,result)=>{
            if(result){
                let token = generateToken(user);
                res.cookie("token",token)
                // req.flash("success" , "Login Successful")
                let product = await productmodel.find({})
                res.render("shop" , { product:product , messages:req.flash()})
            }
            else{
                req.flash("error", "Wrong Credentials")
                res.redirect("/users/login")
            }
        })
    }
})
router.get("/shop", isloggedin , async (req,res)=>{
    let product = await productmodel.find({})
    res.render("shop", { user:req.user  , product:product , messages:req.flash() });

})
router.get("/addtocart/:id" , isloggedin ,  async (req,res)=>{
    let  id = req.params.id
    let product = await productmodel.findById(id);
    let productname = product.name;
    let productprice = product.price;
    let productimage = product.image;
    console.log(productimage)
    let user = await usermodel.findOne({email:req.user.email})
    user.cart.push({id:id , productname:productname , productprice:productprice , productimage:productimage})
    await user.save()
    req.flash("success" ,`${productname}   has   been   Added   to   your   Cart`)
    res.redirect("/users/shop")

})
// cart main = > show products => get user > display his user.cart - foreach(E) e= one product 
router.get("/cart" , isloggedin , async(req,res)=>{
    let user = await usermodel.findOne({email:req.user.email})
    let cart = user.cart ;
    console.log(cart)

    res.render("cart" , { cart:cart })
})
router.get("/account" ,isloggedin, async (req,res)=>{
    let user = await usermodel.findOne({email:req.user.email})

    res.render("account" , {name : user.name , email:user.email , messages:req.flash()})
})
router.get("/logout" , (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send(err.message)
        }
        else{
            res.clearCookie("connect.sid" , {
                path:"/"
            })
            res.clearCookie("token" );
            res.redirect("/users/login")

        }
    })
})


module.exports = router;