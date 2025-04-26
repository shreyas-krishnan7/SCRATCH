const mongoose = require("mongoose")
const productschema = mongoose.Schema({
    image :{
        type:Buffer,
        required:true
    },
    name : {
        type:String,
        required:true
    }, 
    price: {
        type:Number,
        required:true
    }, 
    discount :{
        type:Number,
        default:0
    }, 
    bgcolor : {
        type:String,
        required:true
    } , 
    panelcolor : {
        type: String,
        required:true
    } , 
    textcolor :{
        type:String,
        required:true
    }


})
const productmodel = mongoose.model("product" , productschema)
module.exports= productmodel 