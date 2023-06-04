import React from 'react'
import { useState } from 'react';
import "./Register.scss"
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Register = () => {
    const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [email,setEmail]=useState("");
const [isAdded,setisAdded]=useState(false)
const navigate=useNavigate();
const handle=async (e)=>{
e.preventDefault();
    const data={
        username:username,
        password:password,
        email:email,
    }
     try{
         
         const res= await axios.post("https://contact-xeno.onrender.com/contact/auth/register",data);
         res !==null && setisAdded(true)
        }catch(err){
             console.log(err)
        }

}

  return (
    <div>
    <div className='container'>
   <div className='wrapper'>
     <div className='title'>
         Create account
     </div>
     <form>
         <input type="text" placeholder="name" name="name" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
         <input type="text" placeholder="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
         <input type="password" placeholder="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
     </form>
         <button className='btn1' onClick={(e)=>handle(e)}>create account</button>
         {isAdded===true&& <span style={{color:"green"}}>Added!!!!!!</span>}
         <span onClick={()=>{
          setisAdded(false)
          navigate(-1)
         }}>BACK</span>
   </div>

 </div>
 </div>
  )
}

export default Register
