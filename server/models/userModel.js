const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   name:{ type:String,required:true},
   email:{ type:String,required:true,unique:true},
   password:{ type:String,required:true},
   verifyOtp:{ type:String,default:""},   
   resetOtp:{ type:String,default:""},   
   isAccountVerified:{ type:Boolean,default:false},   
   verifyOtpExpire:{ type:Number,default:0},
   resetOtpExpire:{ type:Number,default:0}
})
const userModel = mongoose.models.user || mongoose.model('user',UserSchema)
module.exports=userModel