import React, { useState } from 'react'
import "./login.scss"
import axios from 'axios';
import List from "../list/List"
import { Link } from 'react-router-dom';
const Login = () => {
  const value=window.localStorage.getItem("token");
  const [username, setUsername] = useState(window.localStorage.getItem("username"));
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(!value?false:true);
  const [H, setH] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    }
    window.localStorage.setItem("username",username)
    try {

      const res = await axios.post("https://contact-xeno.onrender.com/contact/auth/login", data);
      res&&setH(false)

        window.localStorage.setItem("token", res.data.accessToken);
        setShow(true);
        setToken(true);
      }catch (err) {
      console.log(err)
      setH(true)
    }

  }


  return (
    <div>
        {(show === false && token === false ) ?
            <div className='container'>
          <div className='wrapper'>
            <div className='title'>
              SIGN IN
            </div>
            <form>
              <input type="text" placeholder="name" name="name" value={username} onChange={(e) => { setUsername(e.target.value) }} />
              <input type="password" placeholder="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
             
            </form>
            <div className='button'>
            <button className='btn1' onClick={(e) => handle(e)}>Sign in</button>
              <Link to="/register"><button className='btn1' >Sign up</button></Link>
            </div>
          </div>
          {H===true&&<span style={{color:"red" ,marginTop:"20px"}}>WRONG CREDENTIALS!!!!</span>}
      </div>

          : <List username={username} show={setShow} token={setToken}/>
        }

    </div>
  )
}

export default Login
