const router=require('express').Router();
const adminController=require('../controllers/adminController')
router.get('/sellers',adminController.getSellers)
router.post('/sellerApproval',adminController.approveSeller)
router.get('/products',adminController.getProducts)

module.exports=router