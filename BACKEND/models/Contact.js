const mongoose=require("mongoose");

const ContactSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            
        },
        phone:{
            type:String,
            
        },
        address:{
            type:String,
           
        }
    },
    {
        timestamps:true  
    }
)

module.exports=mongoose.model("Contact",ContactSchema)