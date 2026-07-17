const router=require('express').Router()
const passport=require('passport')
const dotenv=require('dotenv')
dotenv.config()
const {OAuth2Client}=require('google-auth-library')
const User=require('../models/userSchema')
const oAuthController=require('../controllers/oAuthControllers')

router.get('/google/callback',oAuthController.getHomePage)
module.exports=router