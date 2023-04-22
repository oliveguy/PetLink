/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
function LoginSignup(){
  let navigate = useNavigate();
  return (
    <div id="signUp">
      <header>
        <img
          src="/img/logo/PetLink-logo.svg"
          className="signupLogo"
          alt="petlink logo"
          onClick={()=>{navigate("/")}}
        />
      </header>
      <Outlet></Outlet>
      <footer>
        <img src="/img/logo/PetLink-wordmark.svg" alt="PetLink-wordmark" />
        <p>Terms and Conditions apply.</p>
      </footer>
    </div>
  )
}

export default LoginSignup