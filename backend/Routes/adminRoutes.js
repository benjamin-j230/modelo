const router=require('express').Router();
const adminController=require('../controllers/adminController')
router.get('/sellers',adminController.getSellers)
router.post('/sellerApproval',adminController.approveSeller)

module.exports=router