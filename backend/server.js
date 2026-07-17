const express=require('express')
const app=express()
app.use(express.json())
const db=require('./config/db')
const cors=require('cors')
const userRoutes=require('./Routes/userRoutes')
const oAuthRoutes=require('./Routes/oAuthRoutes')
const PORT=process.env.PORT||5000
app.use(cors(
    {
        origin:"http://localhost:3000",
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
))
app.use('/user', userRoutes)
app.use('/auth',oAuthRoutes)

console.log(PORT)
db()
app.listen(PORT,()=>console.log("server is running "))


