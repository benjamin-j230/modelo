require('dotenv').config()
const mongoose=require('mongoose')
console.log(process.env.MONGO_URI)
const db=()=>mongoose.connect(process.env.MONGO_URI).then(()=>console.log("connected to db")).catch(err=>console.log(err))
module.exports=db