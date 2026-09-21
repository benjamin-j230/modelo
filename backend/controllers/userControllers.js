const User = require('../models/userSchema')
const Seller = require('../models/sellerSchema')
const dotenv = require('dotenv')
dotenv.config()
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const sellerController = require('./sellerControllers')
const addUser = async (req, res, data, state) => {
    try {
        const existingUser = await User.findOne({ email: data.email });
        if (!existingUser) {
            const password = await bcrypt.hash(state.password, 10)
            const user = new User({
                name: data.name,
                email: data.email,
                password: password,
                address: [{
                    house: state.house,
                    city: state.city,
                    district: state.district,
                    state: state.state,
                    pinCode: state.pin,

                }],
                mobileNumber: state.mobile,

            })
            await user.save()
            res.redirect("http://localhost:3000/login");
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

const userEmail = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')
    const redirectUrl = 'http://localhost:5000/auth/google/callback'
    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    )
    const authorizeURL = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent',
        state: JSON.stringify(req.body)
    })
    res.json({ url: authorizeURL })
}


const login = async (req, res, data) => {
    console.log("hi")
    try {
        if (typeof (data) === "function") {
            var val = 0
            var { email, password, setRole } = req.body
        }
        else {
            var email = data.email
            var setRole = data.setRole
            var val = 1
        }
        if (setRole == "user") {
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(401).json({ message: "user not registered" })
            }

            if (val == 0) {
                const isMatch = await bcrypt.compare(password, user.password)
                console.log(isMatch)
                if (isMatch == false) {
                    return res.status(401).json({ message: "password not correct" })
                }
            }
            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role,
                    email: user.email,

                },
                process.env.jwt_secret,
                {
                    expiresIn: "1d"
                }

            )
            console.log(token)
            console.log(user.email)
            if (val == 1) {
                res.cookie("token", token, {
                    secure: false,
                    sameSite: "lax"
                });

                res.redirect("http://localhost:3000/userPage");
            }
            else if(val==0){
            return res.json({ success: true, token, user })
            }
        }
        else if (setRole == "seller") {
            sellerController.loginSeller(req, res, email, password, setRole,val)
        }

    } catch (err) {
        console.log(err)
    }

}

const getData = async (req, res) => {
    try {
        const user = await User.findById(req.Id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        return res.json({ success: true, user })

    } catch (err) {
        console.log(err)
    }
}

const getProducts = async (req, res) => {
    try {
        const sellers = await Seller.find()
        const products = sellers.flatMap(seller => {
            return seller.product.map(product => ({
                ...product.toObject(),
                sellerId: seller._id

            }))
        })
        return res.json({ success: true, products })
    } catch (err) {
        console.log(err)
    }
}

const getOrders = async (req, res) => {
    try {
        const user = await User.findById(req.Id)
        const orders = user.orders
        return res.json({ orders, success: true })
    }
    catch (err) {
        console.log(err)
    }
}


const getSellers=async(req,res)=>{
    try{
        const sellers=await Seller.find()
        return res.json({success:true,sellers})
    }catch(err){
        console.log(err)
    }
}

module.exports = { addUser, userEmail, login, getData, getProducts, getOrders, getSellers }