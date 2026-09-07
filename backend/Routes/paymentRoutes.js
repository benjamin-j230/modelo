const router=require('express').Router()
const paymentControllers=require('../controllers/paymentController')
const middleWare=require('../controllers/middleWare')
router.post("/createOrders",middleWare.auth,paymentControllers.createOrder)
router.post("/verify",middleWare.auth,paymentControllers.verifyPayment)

module.exports=router