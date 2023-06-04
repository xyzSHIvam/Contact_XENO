import React,{useState,memo, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./List.scss"

const List = (props) => {
   const [List,setList]=useState([]);
   
   const logout=()=>{
    props.show(false)
    props.token(false)
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
   }
   
   const handle=(e,index)=>{
      return (
        <li key={index}>
          <div className='details'>
          <span>Name:{e.name} </span>
          <span>Phone:{e.phone} </span>
          <span>Address:{e.address} </span>
          </div>
       <div className='button'>

      <button className='btn' onClick={async()=>{
        
        const res=await axios.post(`https://contact-xeno.onrender.com/contact/detail/delete/${props.username}`,{id:index},
        { headers: 
          {"Authorization":`Bearer ${window.localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
          
        }});
        setList(res.data)
      }}>🗑️</button>
      <Link to={{pathname:`/update/${index}`}}><button className='btn'>🖋️</button></Link>
      </div>
        </li>
      )
   }

useEffect(()=>{
   axios.get(`https://contact-xeno.onrender.com/contact/detail/${props.username}`).then(data=>{data.data==="dummy"?setList([{name:"dummy",phone:"dummy",address:"dummy"}]):setList(data.data.detail)});
  },[])
  return (
    <div className='containerList'>
      <span className='title'>Contacts of {props.username}</span>
      <button className='btnlogout' onClick={()=>{logout()}}>LOGOUT</button>
      <ul>

      {List.map((e,index)=>handle(e,index))}
      </ul>
      <Link to="/post" ><button className="add">+</button></Link> 
    </div>
  )
}

export default memo(List);
