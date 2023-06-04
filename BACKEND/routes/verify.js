const jwt=require("jsonwebtoken")


const verifyToken=function(req,res,next){
   const authHeader=req.headers.authorization;
 
   
   if(authHeader){
      const token=authHeader.split(" ")[1];

      jwt.verify(token,process.env.JWT_SEC,(err,data)=>{
         if(err){
            return res.status(403).json("Token not valid");
         }
         else{
            req.user=data;//like req.body req.headers we created a new req option user can name anyting
            next();
         }
      })
   }
   else{
      return res.send("You are not authenticated!!");
   }
} 
module.exports={verifyToken}