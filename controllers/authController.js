const User= require('./../models/userModel.js')
const jwt = require("jsonwebtoken")
const AppError = require("../utlis/appError")


const signToken = async(id)=>{
return await jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
  expiresIn:process.env.JWT_EXPIRES_IN,
})
}

exports.signup = async(req,res,next)=>{
  const newUser =await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm,
  });
  //node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  const token = signToken(newUser._id)

  res.status(201).json({
    status:'success',
    token:token,
    data:{
      user:newUser
    }
  })
}

exports.login = async(req,res,next)=>{
  const {email,password} = req.body
  // 1) check if email and password is exist
  if (!email || !password){
    return next(new AppError("please provide valid email and password",400))
  }
  // 2) check if user exist and password correct 
  const user = await User.findOne({email:email}).select("+password")
  //compare passwords well do it in model with bcrypt
  //here 
  
  // 3) if every thing ok,send token to client
  if (!user || !await user.correctPassword(password,user.password)){
    return next(new AppError("incorrect email or passwords",401))
  }

  const token = signToken(user._id);
  res.status(200).json({
    status:"sucecess",
    token:token,
  })


}

exports.protect = async(req,res,next)=>{
  let token;
  // 1) getting token and check if its there
  if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }
  // 2) validate Token

  // 3) Check if user still exists

  // 4)check if ser changed password after the token is issue
  
  next();
}















