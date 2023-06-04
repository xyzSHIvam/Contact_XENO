const express=require("express");
const mongoose=require("mongoose");
mongoose.set('strictQuery', true);
const dotenv=require("dotenv");
const cors=require("cors")
const bodyParser=require("body-parser")

const authRoute=require("./routes/auth");
const detailRoute=require("./routes/details")



dotenv.config();
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());//to access json file from post requests
mongoose.connect(process.env.MONGO_ID)
    .then(()=>console.log("DB connection successfull!"))
    .catch((err)=>console.log(err));


app.use(cors())


////ROUTES
app.use("/contact/auth",authRoute);
app.use("/contact/detail",detailRoute);


app.listen(process.env.PORT||5000,()=>{
    console.log("running on port 5000")
})