const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
       
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

     joinnedOn:{
        type:Date,
        Default:Date.now()
     },

     forgetpassword:{
        time:Date,
        otp:String
     },

    token:{
        type:String,
        
    },
    role:{
        type:Boolean,
        required:true,
        default:false
        
    }
},
{
    collection:"User"
})

module.exports=mongoose.model("User",userSchema);