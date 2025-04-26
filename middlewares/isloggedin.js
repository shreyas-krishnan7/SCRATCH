const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")

const usermodel = require("../models/user")
module.exports= async(req , res , next)=>{
    // console.log("Token from cookie:",req.cookies.token);
    if(!req.cookies || !req.cookies.token){
        req.flash("error" , " Please Login First ");
        return res.redirect("/users/login")
    }
    else{

        try{
            let decoded = jwt.verify(req.cookies.token , process.env.JWT_KEY)
            // console.log(decoded)
            let user = await usermodel.findOne({email:decoded.email})
            // console.log(user)
            req.user = user 
            next()
        }catch(err){
            req.flash("error" , "Something went wrong");
            res.redirect("/");
        }

    }
}