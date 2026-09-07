const User = require('../models/userSchema')
const dotenv = require('dotenv')
const userController = require('./userControllers')
const sellerController = require('./sellerControllers')
dotenv.config()
const { OAuth2Client } = require('google-auth-library')
const getHomePage = async (req, res, next) => {
    const code = req.query.code
    const state = JSON.parse(req.query.state)
    try {

        const redirectUrl = 'http://localhost:5000/auth/google/callback'
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        )
        const response = await oAuth2Client.getToken(code)
        await oAuth2Client.setCredentials(response.tokens)
        console.log('Tokens acquired')
        const user = oAuth2Client.credentials
        console.log('credentials', user)
        const data = await getUserData(user.access_token)
        console.log(state.role)
        if (state.role === "user") {
            userController.addUser(req, res, data, state)
        }
        else if (state.role === "seller") {
            sellerController.addSeller(req, res, data, state)
        }
        else if(state.role==="login"){
            data.setRole=state.setRole
            userController.login(req,res,data,state)
        }
    }
    catch (err) {
        console.error(err)
    }
}

const getUserData = async (access_token) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`)
    const data = await response.json()
    console.log('data', data)
    return data
}

module.exports = { getHomePage }