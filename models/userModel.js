const mongoose= require('mongoose') ;
const validator =require('validator');
const bcrypt =require('bcryptjs');

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
    required:[true,"This field is required"],
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
    required:[true,"This field is required"],
    minlength:8
  },
  passwordConfirm:{
    type:String,
    required:[true,"This field is required"],
    validate:{
      //! This only works on create and save !!!
      validator:function(el){
        return el === this.password;
      },
      message:'Passwords are not the same'
    }
  },
});

userSchema.pre('save', async function(next){
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 10
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Delete passwordConfirm field so it is not saved in the database
  this.passwordConfirm = undefined;
  next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;












