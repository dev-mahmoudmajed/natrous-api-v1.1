const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = new mongoose.Schema({
  //name ,email ,photo,password ,password confirm
  name:{
    type:String,
    required:[true,"This feild is required"],
    unique:true,
    trim:true,
  },
  email:{
    type:String,
    require:[true,"This feild is required"],
    unique:true,
    lowercase:true,
    trim:true,
    validate:[validator.isEmail,'Please provide a valid email']
  },
  photo:{
    type:String,
  },
  password:{
    type:String,
    require:[true,"This feild is required"],
    minlength:8
  },
  passwordConfirm:{
    type:String,
    require:[true,"This feild is required"],
  },
});
const User = mongoose.model("User",userSchema)
module.exports =User;












