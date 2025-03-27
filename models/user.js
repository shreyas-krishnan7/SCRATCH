const mongoose = require("mongoose")
const userschema = mongoose.Schema({
    name : {
        type:String
    }, 
    email :{
        type:String 
    }, 
    password :{
        type:String 
    }, 
    cart :{
        type:Array,
        default:[]
    },
     isadmin :{
        type:Boolean 
    },
    orders:[{
        type:Array , 
        default:[]
    }
    ],
    contact:{
        type:Number
    }, 
    picture :{
        type:String
    }

})
const usermodel = mongoose.model("user" , userschema)
module.exports= usermodel  