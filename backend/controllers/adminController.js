const Admin=require('../models/adminSchema')
const Seller=require('../models/sellerSchema')
const sendEmail=require('../utils/sendEmail')
const User=require('../models/userSchema')
const getSellers=async(req,res)=>{
    try{
        const admin=await Admin.findOne()
        const sellers=admin.sellers
        return res.json(sellers)
    }
    catch(err){
        console.log(err)
    }
}

const approveSeller=async(req,res)=>{
    try{
        const {sellerId}=req.body
        const admin=await Admin.findOne()
        const sellers=admin.sellers
        const seller=sellers.find(seller=>seller._id.toString()===sellerId)
        const saveSeller=await Seller.create({
            shop: seller.shop,
                email: seller.email,
                password: seller.password,
                address: [{
                    street: seller.address[0].street,
                    city: seller.address[0].city,
                    state: seller.address[0].state,
                    pinCode: seller.address[0].pinCode,
                }],
                mobileNumber: seller.mobileNumber,
        })
        saveSeller.save()
        admin.sellers=admin.sellers.filter(seller=>seller._id.toString()!==sellerId)
        await admin.save()
        sendEmail(seller.email,"Verification email","You are verified as a seller on modelo. You can now login and start selling your products. Thank you for choosing modelo.")
        res.json({success:true})
    }catch(err){
        console.log(err)
    }
}

const getProducts=async(req,res)=>{
    try{
        const admin=await Admin.findOne()
        const products=admin.products
        return res.json(products)
    }catch(err){
        console.log(err)
    }
}


const getUsers=async(req,res)=>{
    try{
        const users=await User.find()
        return res.json(users)
    }catch(err){
        console.log(err)
    }
}

const uploadLicense=async(req,res)=>{
    try{
        const email=req.body.email
        const admin=await Admin.findOne()
        const seller=await admin.sellers.find(seller=>seller.email===email)
        console.log(seller)
        seller.lic=1
        seller.licenseImage=req.file.filename
        await admin.save()
        sendEmail(seller.email,"License Upload","Your license has been uploaded. We will verify your license and notify you when we accept through email.")
        res.json({success:true})
    }catch(err){
        console.log(err)
    }
}



module.exports={getSellers,approveSeller,getProducts,getUsers,uploadLicense} 