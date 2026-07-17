const mongoose=require('mongoose')
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,

    },
    address:[
        {
        house:{
            type:String,
            required:true
        },
        street:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pinCode:{
            type:String,
            required:true
        }
    }
    ],
    mobileNumber:{
        type:String,
        required:true
    }
})
const User=mongoose.model("User",userSchema)
module.exports=User