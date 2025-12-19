const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const  transporter  = require('../config/emailSender');
const { generateOtp } = require('../utils/generateOtp');


exports.sendVerifyOtp = async (req,res) =>{
  try {
    const  userId  = req.userId
    const user = await userModel.findById(userId)
    if(!user){
       return res.json({
        is_success:false,
        message:"Not Found"})
    }
    if(user.isAccountVerified){
        return res.json({
        is_success:false,
        message:"Account  Already Verified"})
    }
  const otp = generateOtp()
  user.verifyOtp = otp
  user.verifyOtpExpire= Date.now() + 24 *60*60*1000
  await user.save()
  const message={
    from:process.env.EMAIL,
    to:user.email,
    subject:"Verification Request for Your Account",
    text:`Your OTP is ${otp} .Verify Your account using This OTP .Please Don't share Anyone `
  }
  await transporter.sendMail(message)
  res.json({
    is_success:true,
    message:"Verification OTP sent on Your Email"
  })
  } catch (error) {
   res.json({
        is_success:false,
        message:error.message}) 
  }
}
// ------------------------------------------
exports.verifyAccount=async(req,res)=>{
 const {otp} = req.body;
 const userId = req.userId
 if(!userId || !otp){
    return res.json({
        is_success:false,
        message:"Something Details are Missing"
    })
 }
 try {
    const user = await userModel.findById(userId)
    if(!user){
       return res.json({
        is_success:false,
        message:"Not Found"})
    }
    if(user.isAccountVerified){
        return res.json({
        is_success:false,
        message:"Account  Already Verified"})
    }
    if(user.verifyOtp ==='' || user.verifyOtp !== otp ){
        return res.json({
        is_success:false,
        message:"OTP is Invailed "})
    } 
        if(user.verifyOtpExpire < Date.now()){
        return res.json({
        is_success:false,
        message:"OTP is Expired"})
    } 
    user.isAccountVerified = true
    user.verifyOtp =""
    user.verifyOtpExpire =0
    await user.save()
    res.json({
        is_success:true,
        message:"Your Account Has been Verified"
    })
 } catch (error) {
    res.json({
        is_success:false,
        message:error.message
    })
 }
} 