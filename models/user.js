const mongoose = require("mongoose");
const {ObjectId}= mongoose.Schema.Types;

const userSchema=new mongoose.Schema({
    profilePic:{type:String,
        default:"https://res.cloudinary.com/dvpg6kmsv/image/upload/v1621075442/eyswoywnlgcxye9kkfac.png"},
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

mongoose.model("User",userSchema);