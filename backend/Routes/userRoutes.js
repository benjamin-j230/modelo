const router=require('express').Router()
const passport=require('passport')
const dotenv=require('dotenv')
dotenv.config()
const {OAuth2Client}=require('google-auth-library')
const User=require('../models/userSchema')
const userControllers=require('../controllers/userControllers')
router.post("/",userControllers.addUser)
router.post("/register",userControllers.userEmail)

module.exports=router