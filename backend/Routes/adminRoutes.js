const router=require('express').Router();
const adminController=require('../controllers/adminController')
router.get('/sellers',adminController.getSellers)

module.exports=router