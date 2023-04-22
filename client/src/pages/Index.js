/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';


function Index(){
  let navigate = useNavigate();
  return(
    <div id="splash_main">
      <img src="img/logo/PetLink-symbol.svg" alt="PetLink-symbol" />
      <img src="img/logo/PetLink-wordmark.svg" alt="PetLink wordmark" />
      <a onClick={()=>{navigate("/connect/login")}} className="splash_btn">Log In</a>
      <a onClick={()=>{navigate('/connect/signup')}} className="splash_btn">Sign Up</a>
    </div>
  )
}

export default Index