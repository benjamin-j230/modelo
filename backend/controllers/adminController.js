const Admin=require('../models/adminSchema')
const Seller=require('../models/sellerSchema')
const sendEmail=require('../utils/sendEmail')
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

const approveProduct=async(req,res)=>{
    try{
        const {productId}=req.body
        const admin=await Admin.findOne()
        const product=await admin.products.find(product=>product._id.toString()===productId)
        const seller=await Seller.findOne({_id:product.seller._id})
        seller.product.push({
            brand: product.brand,
                model: product.model,
                description:product.description,
                scale:product.scale,
                price: product.price,
                image: product.image,
        })
        await seller.save()
        admin.products=admin.products.filter(product=>product._id.toString()!==productId)
        await admin.save()
        sendEmail(seller.email,"Product Approval","Your product has been approved. You can now sell this product on modelo. Thank you for choosing modelo.")
        res.json({success:true})
    }catch(err){
        console.log(err)
    }
}

module.exports={getSellers,approveSeller,getProducts,approveProduct} 