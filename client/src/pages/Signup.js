/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';

function Signup(){
  let navigate = useNavigate();
  const [user_email, setEmail] = useState('');
  const [user_password, setPWD] = useState('');

  const [reTypePWD, setRetypePWD] = useState('');
  const [signupMsg, setSignupMsg] = useState('');
  const [alert, setAlert] = useState('signupMsg');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user_password === ''|| reTypePWD ===''){
      setSignupMsg('Enter your ID or password')
      setAlert('signupMsg signup-alert')
    } else if(user_password !== reTypePWD){
      setSignupMsg('Check your password')
      setAlert('signupMsg signup-alert')
    } else {
      axios.post('/user/signup',{user_email,user_password})
      .then(res=>{
        if(res.status == 200){
          sessionStorage.setItem('user_email', res.data.userID)
          sessionStorage.setItem('firstUser', true)
          navigate('/connect/personalInfo')
        }
      })
      .catch((err)=>{
        if(err.response.status == 400){
          setSignupMsg('The email you typed in already existed!')
          setAlert('signupMsg signup-alert')
        }
      })
    }
  }
  return(
    <div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1 className="LS-title">Sign up</h1>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={user_email}
            name="input-email"
            type="text"
            placeholder="Your email" />
          <input
            onChange={(e)=>setPWD(e.target.value)}
            value={user_password}
            name="input-password"
            type="password"
            placeholder="Password" />
          <input
            onChange={(e)=>{setRetypePWD(e.target.value)}}
            value={reTypePWD}
            type="password"
            placeholder="Re-enter Your Password" />
            <span className={alert}>{signupMsg}</span>
          <input
            type="submit" 
            value="Sign Up"
            className='signupBtn'
          />
        </form>
      </div>
    </div>
  )
}

export default Signup