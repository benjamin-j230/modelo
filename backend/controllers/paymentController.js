const Razorpay = require("razorpay");
const Payment = require("../models/paymentSchema")
const User=require("../models/userSchema")
const crypto=require("crypto")
const sellerController=require("./sellerControllers")

const razorpay = new Razorpay({
    key_id: process.env.razorpay_key_id,
    key_secret: process.env.razorpay_key_secret
});

const createOrder = async (req, res) => {
    try {
        const { amount, orderId } = req.body
        const user=await User.findById(req.Id)
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: orderId
        })
        const payment = await Payment.create({
            order: orderId,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            status: "created",
            user:user
        });

        res.status(200).json({
            success: true,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
        })
    }
    catch (err) {
        console.log(err)
    }
}


const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            product,
            user
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            console.log("payment success")
            const result=await sellerController.addOrders(req,res,req.Id,product,user)
            const data=result.message
            return res.json({data:data})
            

        } else {

            res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Payment verification failed"
        });
    }
}

module.exports = { createOrder,verifyPayment }