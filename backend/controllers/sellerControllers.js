const Seller = require('../models/sellerSchema')
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { findByIdAndUpdate } = require('../models/userSchema');
const Admin = require('../models/adminSchema')
const mongoose = require("mongoose");
const addSeller = async (req, res, data, state) => {
    try {
        const existingSeller = await Seller.findOne({ email: data.email });
        if (!existingSeller) {
            const password = await bcrypt.hash(state.password, 10)
            const seller = new Seller({
                shop: state.shop,
                email: data.email,
                password: password,
                address: [{
                    street: state.street,
                    city: state.city,
                    state: state.state,
                    pinCode: state.pin,

                }],
                mobileNumber: state.mobile,
                seller: state.seller,

            })
            verifySeller(seller)
            return res.redirect("http://localhost:3000/?message=seller_verification");
        }
        else {
            return res.redirect(
                "http://localhost:3000/emailVerification?error=email_exists"
            );
        }

    }
    catch (err) {
        res.status(500).json({ message: "Error ", err })
    }
}

const verifySeller=async(seller)=>{
    const admin=await Admin.find()
    console.log(admin[0])
    await admin[0].updateOne({
        $push: { sellers: seller }
    })
    
}



const loginSeller = async (req, res, email, password, role,val) => {
    try {
        console.log(role)
        const seller = await Seller.findOne({ email })
        if (!seller) {
            return res.status(401).json({ message: "user not registered" })
        }
        if(val==0){
        const isMatch = await bcrypt.compare(password, seller.password)
        if (isMatch == false) {
            return res.status(401).json({ message: "password not correct" })
        }
    }
        const token = jwt.sign(
            {
                id: seller._id,
                role: seller.role,
                email: seller.email,

            },
            process.env.jwt_secret,
            {
                expiresIn: "1d"
            }
        )
         if (val == 1) {
                res.cookie("token", token, {
                    secure: false,
                    sameSite: "lax"
                });

                res.redirect("http://localhost:3000/sellerView");
            }
            else if(val==0){
            return res.json({ success: true, token, seller })
            }
    }
    catch (err) {
        console.log(err)
    }
}

const getSeller = async (req, res) => {
    try {
        const seller = await Seller.findById(req.Id).select("-password");
        if (!seller) {
            return res.status(404).json({ message: "seller not found" })
        }
        return res.json({ success: true, seller })
    } catch (err) {
        console.log(err)
    }
}

const addProduct = async (req, res) => {
    try {
        const seller = await Seller.findById(req.Id)
        const admin=await Admin.findOne()
        if (!seller) {
            return res.status(404).json({ message: "user not found" })
        }
        else {
            admin.products.push({
                seller:seller,
                brand: req.body.brand,
                model: req.body.model,
                description:req.body.description,
                scale:req.body.scale,
                price: req.body.price,
                image: req.file.filename
            })
            await admin.save()
            return res.json({ success: true, message: "product added successfully" })
        }
    } catch (err) {
        console.log(err)
    }
}

const saveLocation = async (req, res) => {
    try {
        console.log(req.body.sellerId)
        const seller = await Seller.findById(req.body.sellerId)
        if (!seller) {
            return res.status(404).json({ message: "user not found" })
        }
        else {
            seller.location = {
                type: "Point",
                coordinates: [req.body.longitude, req.body.latitude]
            }
            await seller.save()
            return res.json({ success: true, message: "location saved successfully" })


        }
    }

    catch (err) {
        console.log(err)
    }
}


const addOrders = async (req, res,userId,productData,user) => {
    const { sellerId, ...product } = productData
    console.log("hi")
    console.log(product,sellerId)
    const currentUser = await User.findById(user._id)
    const seller = await Seller.findById(sellerId)
    currentUser.orders.push({ ...product, status: "order placed" })
    product.user = user
    seller.orders.push(product)
    await seller.save()
    await currentUser.save()
    return { message: "order placed successfully" }

}

const acceptOrder = async (req, res) => {
    try {
        const { productId, userId, sellerId } = req.body
        const seller = await Seller.findById(sellerId)
        const user = await User.findById(userId)
        const newOrderId = new mongoose.Types.ObjectId()
        const order = seller.orders.find(
            order => order._id.toString() === productId.toString()
        );
        seller.acceptedOrders.push({ ...order, _id: newOrderId, status: "accepted" })
        seller.orders = seller.orders.filter(
            order => order._id.toString() !== productId.toString()
        );
        const userOrder = user.orders.find(order => order._id.toString() === productId.toString())
        userOrder.status = "accepted"
        userOrder._id = newOrderId
        user.markModified("orders")
        await seller.save()
        await user.save()
        res.status(200).json({ message: "order accepted successfully", success: true })
    }
    catch (err) {
        console.log(err)
    }
}

const getAcceptedOrder = async (req, res) => {
    try {
        const seller = await Seller.findById(req.Id)
        const accepted = seller.acceptedOrders
        res.status(201).json({ accepted, success: true })
    } catch (err) {
        console.log(err)
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const seller = await Seller.findById(req.Id)
        const order = seller.acceptedOrders.find(
            order => order._id.toString() === req.params.id
        );
        await User.updateOne(
            { "orders._id": new mongoose.Types.ObjectId(req.params.id) },
             { $set: { "orders.$.status": status } }
        )
        order.status = status
        seller.markModified("acceptedOrders")
        await seller.save()
        res.status(201).json({ status, success: true })
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { addSeller, loginSeller, getSeller, addProduct, saveLocation, addOrders, acceptOrder, getAcceptedOrder, updateStatus }