const router=require('express').Router();
const adminController=require('../controllers/adminController')
const middleWare=require('../controllers/middleWare')
router.get('/sellers',adminController.getSellers)
router.post('/sellerApproval',adminController.approveSeller)
router.get('/products',adminController.getProducts)
router.get('/users',adminController.getUsers)
router.post('/uploadLicense',middleWare.upload.single('licenseImage'),adminController.uploadLicense)

module.exports=router