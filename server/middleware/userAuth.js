const jwt = require('jsonwebtoken')
const userAuth = async(req,res,next) =>{
    const { token } = req.cookies;
    console.log(token)
    if(!token){
        return res.json({
            is_success:false,
            message:"Not Authorized . Login Again"
        })    
    }
    try {
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decodeToken.id){
            return res.json({
            is_success:false,
            message:"Not Authorized . Login Again"})   
        } 
        req.userId = decodeToken['id']
        
        next();
    } catch (error) {
        res.json({
            is_success:false,
            message:error.message
        })  
    }
}
module.exports = userAuth
