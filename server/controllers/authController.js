const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const  transporter  = require('../config/emailSender');

// Register function
exports.register = async(req,res) =>{
  const {email,password,name} = req.body;
  if(!name || !password || !email ){
    return res.json({
        is_success:false,
        message:"Somthing Missing Details"})
  }
  try {
    const existingUser = await userModel.findOne({email})
    if(existingUser){
        return res.json({
        is_success:false,
        message:"User Already Exists "})
    }

    const hashed_password = await bcrypt.hash(password,10)
    const user = new userModel({name,email,password:hashed_password})
    await user.save()
    const message={
        from : process.env.EMAIL,
        to:user.email,
        subject:"Welcome To My Website",
        text:`Welcome to My website .Your Account has been created with email id : ${user.email}`
    }
    await transporter.sendMail(message);
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        sameSite:process.env.NODE_ENV ==='production'? 'none' : 'strict',
        maxAge : 7 * 24 * 60 * 60 * 1000})
   
    return res.json({
            is_success:true,
            message:"Successfully Registered"})
 } catch (error) {
    res.json({
        is_success:false,
        message:error.message})
 }

}
// -------------------------------------
// Login
exports.login = async (req,res) =>{
    const { email , password }= req.body;
    if(!password || !email ){
    return res.json({
        is_success:false,
        message:"Email And Password are Required"})
    }

    try {       
        const user = await userModel.findOne({email})
        if(!user){
           return res.json({
             is_success:false,
             message:"Invailed Email"}) 
        }
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({
                is_success : false,
                message:"Incorrect Password"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
        
        await res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        sameSite:process.env.NODE_ENV ==='production'? 'none' : 'strict',
        maxAge : 7 * 24 * 60 * 60 * 1000})  
        
        res.json({
            is_success:true,
            message:"Successfully Login"})
    } catch (error) {
        res.json({
        is_success:false,
        message:error.message})
    }
}
// -------------------------------------------------------------------
// Logout
exports.logout = (req,res) =>{
  try {
    res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        sameSite:process.env.NODE_ENV ==='production'?'none' : 'strict'
    })
    return res.json({
        is_success:true,
        message:"successfully Logout"
    })
  } catch (error) {
    res.json({
        is_success:false,
        message:error.message})
  }
}