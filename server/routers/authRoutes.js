const { register, login, logout } = require('../controllers/authController')
const { isAuthenticated } = require('../controllers/usercontroller')
const { sendResetOTP, resetPassword } = require('../controllers/resetContoller')
const { sendVerifyOtp, verifyAccount } = require('../controllers/verifyController')
const userAuth = require('../middleware/userAuth')

const authRouter = require('express').Router()


authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.post("/send-verify-otp",userAuth,sendVerifyOtp)
authRouter.post("/verify-account",userAuth,verifyAccount)
authRouter.get("/is-auth",userAuth,isAuthenticated)
authRouter.post("/send-reset-otp",sendResetOTP)
authRouter.post("/reset-password",resetPassword)


module.exports = authRouter
