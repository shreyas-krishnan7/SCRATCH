const mongoose = require("mongoose")
const ownerschema = mongoose.Schema({
    name : {
        type:String
    }, 
    email :{
        type:String 
    }, 
    password :{
        type:String 
    }, 
    products : {
        type:String,
        default:[]
    },
    picture :{
        type:String
    }

})
const ownermodel = mongoose.model("owner" , ownerschema)
module.exports= ownermodel 