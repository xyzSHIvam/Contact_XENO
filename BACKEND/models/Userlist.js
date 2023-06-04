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

const UserlistSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            
           
        },
        detail:[ContactSchema]
    },
    {
        timestamps:true  
    }
)


module.exports=mongoose.model("Userlist",UserlistSchema)