const router=require("express").Router();
const Userlist=require("../models/Userlist")
const Contact=require("../models/Contact")
const {verifyToken}=require("../routes/verify")


////////READ////////////

router.get("/:id", async(req,res)=>{
const username=req.params.id;
const fs= await Userlist.findOne({username:username})

if(fs===null)
{
    const newdata=new Userlist({
         username:username,
         detail:[{}]
    })
    await newdata.save();
    res.status(200).json("dummy");
}
else{
  
    res.status(200).json(fs);
}
})


////////CERATE/////////////

router.post("/:id", verifyToken ,async(req,res)=>{
    const username=req.params.id;
    const data=req.body;
    const newdetail=new Contact(data);
      
    try{

        const det=await Userlist.findOne({username:username})
        det.detail.push(newdetail)
        det.save();
        res.status(200).json(det.detail)
    }catch(err)
    {
        res.status(401).json("err")
    }

    })

/////////DELETE///////////////////////
router.post("/delete/:id",verifyToken,async(req,res)=>{
    const id=req.body;
    console.log(id);
    const username=req.params.id;
    let det=await Userlist.findOne({username:username});
    
   const newDetail= det.detail.filter((e,index)=>{
      return index!==id.id
    })
    det.detail=newDetail;
    det.save();
    res.status(200).json(det.detail)
    
})


////////////////////UPDATE/////////////////////////////////


router.put("/update/:id",verifyToken,async(req,res)=>{
    const username=req.params.id;
    const data=req.body;
    console.log(data)
    console.log(username)
    try{
        await Userlist.updateOne({username:username},
       {
        $set:
        {
            [`detail.${data.index}.name`]:`${data.name}`,
            [`detail.${data.index}.phone`]:`${data.phone}`,
            [`detail.${data.index}.address`]:`${data.address}`,
    
    }
    }
    
    )

    res.status(200).json("updated");
    }catch(err){
        res.status(500).json("INTERNAL ERROR")
    }

})


    module.exports=router