const User=require('../models/userSchema')
const dotenv=require('dotenv')
dotenv.config()
const bcrypt=require('bcrypt')
const {OAuth2Client}=require('google-auth-library')
const addUser=async(req,res,data,state)=>{
    try{
        const existingUser = await User.findOne({ email:data.email });
        if(!existingUser){
        const password=await bcrypt.hash(state.password,10)
        const user=new User({
            name:data.name,
            email:data.email,
            password:password,
            address:[{
                house:state.house,
                street:state.street,
                city:state.city,
                state:state.state,
                pinCode:state.pin,

            }],
            mobileNumber:state.mobile,
            
        })
        await user.save()
        res.redirect("http://localhost:3000/homePage");
    }
    else{
        return res.redirect(
    "http://localhost:3000/emailVerification?error=email_exists"
);
    }

    }
    catch(err){
        res.status(500).json({message:"Error ",err})
    }
}

const userEmail=async(req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:3000')
    res.header('Referrer-Policy','no-referrer-when-downgrade')
    const redirectUrl='http://localhost:5000/auth/google/callback'
    const oAuth2Client=new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    )
    const authorizeURL=oAuth2Client.generateAuthUrl({
        access_type:"offline",
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
        prompt:'consent',
        state:JSON.stringify(req.body)
    })
    res.json({url:authorizeURL})
}

module.exports={addUser,userEmail}