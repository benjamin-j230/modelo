const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  sellers:[
    {
      shop: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,

    },
    address: [
        {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            pinCode: {
                type: String,
                required: true
            }
        }
    ],
    mobileNumber: {
        type: String,
        required: true
    },
    seller: {
        type: String,
    },
    product: [
        {
            brand: String,
            model: String,
            price: Number,
            image: String,
            description:String,
            scale:String,
        }
    ],
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
        }
    },
    orders: [],
    acceptedOrders: [],
    status:{
        type:String,
    },
    lic:{
        type:Number
    },
    licenseImage:{
        type:String
    }
      
    }
  ],
  products:[{
    
  }]
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;