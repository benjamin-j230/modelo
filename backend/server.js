const express=require('express')
const app=express()
app.use(express.json())
const db=require('./config/db')
const cors=require('cors')
const userRoutes=require('./Routes/userRoutes')
const oAuthRoutes=require('./Routes/oAuthRoutes')
const sellerRoutes=require('./Routes/sellerRoutes')
const paymentRoutes=require('./Routes/paymentRoutes')
const adminRoutes=require('./Routes/adminRoutes')
const PORT=process.env.PORT||5000
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(cors(
    {
        origin:"http://localhost:3000",
        methods:["GET","POST","PUT","DELETE","PATCH"],
        credentials:true
    }
))
app.use('/user', userRoutes)
app.use('/auth',oAuthRoutes)
app.use('/seller',sellerRoutes)
app.use("/uploads", express.static("uploads"));
app.use("/payment",paymentRoutes)
app.use('/admin',adminRoutes)


console.log(PORT)
db()
app.listen(PORT,()=>console.log("server is running "))


