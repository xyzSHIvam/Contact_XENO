import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "./update.scss"
const Update = () => {
    
    const username=window.localStorage.getItem("username");
    const {index}=useParams();
    const navigate=useNavigate();
      const [name,setName]=useState("")
      const [phone,setPhone]=useState("")
      const [address,setAddress]=useState("")
      const [H,setH]=useState(false)
    
    
     const handle=async(e)=>{
      e.preventDefault();
     
      const data={
        index:index,
        name:name,
        phone:phone,
        address:address
      }
      await axios.put(`https://contact-xeno.onrender.com/contact/detail/update/${username}`,data, { headers: 
      {"Authorization":`Bearer ${window.localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
     
    }}).then(data=>data&&setH(true))
     }

  return (
    <div>
      <div className='container2'>
        <div className='wrapper'>

        <span className='title'>UPDATE CONTACT</span>
       <form>
       <input placeholder='name' name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
       <input placeholder='phone' name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
       <input placeholder='address' name="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
       </form>
       <button className='btn1' onClick={(e)=>{handle(e)}}>Update</button>
       <button className='btn1' onClick={()=>navigate(-1)}>back</button>
        {H===true&&<span style={{color:"green"}} >UPDATED !!! PRESS BACK TO LIST</span>}
        </div>
    </div>
    </div>
  )
}

export default Update
