const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productmodel = require("../models/product");
router.get("/" , (req,res)=>{
    res.send("hello products");
})
router.post("/create" , upload.single("image"), async(req,res)=>{
    try{
        let{ name , price ,bgcolor, panelcolor , textcolor} = req.body
        let product = await productmodel.create({
        image:req.file.buffer,
        name:name, 
        price:price , 
        bgcolor:bgcolor,
        panelcolor:panelcolor, 
        textcolor:textcolor

    })
    req.flash("success" , "Product Created Successfully")
    res.redirect("/owners/admin")

    }
    catch(err){
        res.send(err.message);
    }
    
})
module.exports = router;
