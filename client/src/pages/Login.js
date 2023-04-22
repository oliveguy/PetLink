/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';

function Login(){
  let navigate = useNavigate();
  const [loginID, setLoginID] = useState('');
  const [loginPWD, setLoginPWD] = useState('');
  const [loginMsg, setloginMsg] = useState('');
  const [alert, setAlert] = useState('signupMsg');
  const handleLogin = (e) =>{
    e.preventDefault();
    if(loginID === ''){
      setloginMsg('Type your email')
      setAlert('signupMsg signup-alert')
    } else if(loginPWD === ''){
      setloginMsg('Type your password')
      setAlert('signupMsg signup-alert')
    } else {
      axios.post('/user/login',{loginID,loginPWD})
      .then(res=>{
        if(res.status === 200){
          sessionStorage.setItem('user_email', res.data.data);
          sessionStorage.setItem('firstUser', false);
          navigate("/home/welcome");
        }
      })
      .catch((err)=>{
        if(err.response.data.msg = "noID"){
          setloginMsg('Incorrect email')
          setAlert('signupMsg signup-alert')
        } else if (err.response.data.msg = "nopassword"){
          setloginMsg('Incorrect password')
          setAlert('signupMsg signup-alert')
        }
      })
    }
  }
  return(
    <div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1 className="LS-title">Log In</h1>
          <span className={alert}>{loginMsg}</span>
          <input onChange={(e)=>{setLoginID(e.target.value)}} value={loginID} type="text" placeholder="Your email" />
          <input onChange={(e)=>{setLoginPWD(e.target.value)}} value={loginPWD} type="password" placeholder="Password" />
          <a href="#">Forgot password?</a>
          <input type="submit" value="Log In" />
        </form>
          <a onClick={()=>{navigate('/connect/signup')}}>Don't you have ID?</a>
      </div>
    </div>
  )
}

export default Login