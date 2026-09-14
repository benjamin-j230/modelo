const Admin=require('../models/adminSchema')
const Seller=require('../models/sellerSchema')
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

module.exports={getSellers} 