import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./post.scss";
const Post = () => {
  const username=window.localStorage.getItem("username");
const navigate=useNavigate();
  const [name,setName]=useState("")
  const [phone,setPhone]=useState("")
  const [address,setAddress]=useState("")
  const [H,setH]=useState(false)
  const handle=async(e)=>{
    e.preventDefault();
    const data={
      name:name,
      phone:phone,
      address:address
    }
    await axios.post(`https://contact-xeno.onrender.com/contact/detail/${username}`,data, { headers: 
    {"Authorization":`Bearer ${window.localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
   
  }}).then(data=>{
    data&&setH(true)
  })
  }
  return (
    <div className='container1'>
      <div className='wrapper'>

      <span className='title '>POST CONTACTS</span>
       <form>
       <input placeholder='name' name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
       <input placeholder="phone" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
       <input placeholder='address' name="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
       </form>
       <button className='btn1' onClick={(e)=>{handle(e)}}>add</button>
       <button className='btn1' onClick={()=>navigate(-1)}>back</button>
       {H===true&&<span style={{color:"green"}}>ADDED!!!! PRESS BACK TO SEE LIST</span>}
      </div>
    </div>
  )
}

export default Post
