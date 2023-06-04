const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            unique:true
        },
        email:{
            type:String,
           
           
        },
        password:{
            type:String,
           
        }
    },
    {
        timestamps:true  
    }
)


module.exports=mongoose.model("User",UserSchema)