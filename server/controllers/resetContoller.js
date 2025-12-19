const  transporter = require("../config/emailSender");
const userModel = require("../models/userModel");
const { generateOtp } = require("../utils/generateOtp");
const bcrypt = require('bcryptjs')
exports.sendResetOTP = async (req,res,next) =>{    
    const { email }= req.body;
      if(!email){
            return res.json({
                is_success :false,
                message:"Email is Required"
            })
        }
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({
                is_success :false,
                message:"Invailed Email"
            })
        }
        const otp = generateOtp()
          user.resetOtp = otp
          user.resetOtpExpire= Date.now() + 5 * 60 * 1000
          await user.save()
          const message={
            from:process.env.EMAIL,
            to:user.email,
            subject: "Your OTP for Password Reset",
            text: `Your OTP for resetting your account password is ${otp}. Do not share this code with anyone.`
          }
          await transporter.sendMail(message)
          res.json({
            is_success:true,
            message:"Verification OTP sent on Your Email"
          })
    } catch (error) {
        res.json({
            message:error.message,
            is_success:false
        })
    }

}
// -----------------------------
exports.resetPassword=async(req,res)=>{
 const { email,otp,newpassword} = req.body;
 if(!email || !otp || !newpassword){
    return res.json({
        is_success:false,
        message:"Something Details are Missing"
    })
 }
 try {
    const user = await userModel.findOne({email})
    if(!user){
       return res.json({
        is_success:false,
        message:"Not Found"})
    }
    if(user.resetOtp ==='' || user.resetOtp !== otp ){
        return res.json({
        is_success:false,
        message:"OTP is Invaild "})
    } 
    if(user.resetOtpExpire < Date.now()){
        return res.json({
        is_success:false,
        message:"OTP is Expired"})
    } 
    const hashedPassword = await bcrypt.hash(newpassword,10)
    user.password = hashedPassword
    user.resetOtp =""
    user.resetOtpExpire =0
    await user.save()
    res.json({
        is_success:true,
        message: "Your password has been reset successfully."

    })
 } catch (error) {
    res.json({
        is_success:false,
        message:error.message
    })
 }
} 