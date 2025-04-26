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
    cart: [{
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product"
        },
        productname: {
          type: String
        }, 
        productprice:{
            type:Number
        }, 
        productimage:{
            type:Buffer,
        }
      }]
    ,
    orders:{
        type:Array , 
        default:[]
    }
    ,
    contact:{
        type:Number
    }, 
    picture :{
        type:String
    }

})
const usermodel = mongoose.model("user" , userschema)
module.exports= usermodel  