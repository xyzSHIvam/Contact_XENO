const router=require("express").Router();
const User=require("../models/User")
const CryptoJS=require("crypto-js")
const jwt=require("jsonwebtoken");



///REGISTER

router.post("/register",async (req,res)=>{
    const newUser = new User(
        {
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(//for encryption of password
            req.body.password,
             process.env.PASS_SEC
             ).toString(), 
        isAdmin:req.body.isAdmin
        }
    )
    try{

        const savedUser=await newUser.save();
        res.status(200).json(savedUser)//sent the saved User's detailes(JSON format)
    }
    catch(err){
         res.status(500).json(err)
    }
})

////////////////LOGIN///////////////////


router.post("/login",async(req,res)=>{
  try{

      const user =await User.findOne({username:req.body.username});
      if(user){ const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const Ogpassword=hashedPassword.toString(CryptoJS.enc.Utf8);  
        console.log(Ogpassword)
  
        if(Ogpassword!==req.body.password) { 
          res.status(401).json("wrong Credentials")
      }
      else{
        const accessToken = jwt.sign({
          id:user._id,
        },process.env.JWT_SEC,
        {expiresIn:"3d"}
        );
       
        const {password,...others} =user._doc; ///its done to not send password to the user expect that everything
                                                //_doc is the file which mongo db uses to send files(complusory)
        res.status(200).json({...others,accessToken});
      }
  }
  else{
    res.status(500).json("Wrong Credentials!!");
  }
    

  }
  catch(err){
      res.status(500).json(err);
  }
})


module.exports=router