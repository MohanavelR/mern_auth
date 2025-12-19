const userModel = require("../models/userModel");

exports.isAuthenticated =async(req,res)=>{
    
try {
    res.json({
    is_success:true,message:"Authenticated"  
})
} catch (error) {
    res.json({
        is_success:false,message:error.message    })
}
}


exports.userDetails = async(req,res)=>{
    const  userId  = req.userId;
    if(!userId){
    return res.json({
        is_success:false,
        message:"Not Authorized .Login Again"
    })
 }
   try {
    const user = await userModel.findById( userId )
    if(!user){
       return res.json({
        is_success:false,
        message:"Invaild User"})
    }
    res.json({
        is_success:"true",
        message:"Successfully get Information",
        user:{
            name:user.name,
            email:user.email,
            isAccountVerified:user.isAccountVerified
        }
    })
   } catch (error) {
       res.json({
        is_success:false,message:error.message    })
   }
}