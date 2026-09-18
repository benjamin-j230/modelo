const mongoose = require('mongoose');
const sellerSchema = mongoose.Schema({
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
            image: String
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
    }
})
sellerSchema.index({ location: "2dsphere" });
const Seller = mongoose.model("Seller", sellerSchema)
module.exports = Seller