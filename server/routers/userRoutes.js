
const { userDetails } = require('../controllers/usercontroller')

const userAuth = require('../middleware/userAuth')

const userRouter = require('express').Router()

userRouter.get("/data",userAuth,userDetails)

module.exports = userRouter
