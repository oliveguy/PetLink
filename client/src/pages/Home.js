/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';

import chat from '../src-img/chat.png';
import arrow from '../src-img/down_arrow_.png';
import heart from '../src-img/heart.png';
import more from '../src-img/moreHome.png';
import report from '../src-img/report.png';
import person from '../src-img/person.png';
import symbol from '../src-img/PetLink-symbol.svg';
import wordmark from '../src-img/PetLink-wordmark-red.svg';

function Home(){
  let navigate = useNavigate();
  return(
    sessionStorage.user_email ?
      <div className='homeBody'>
        <header className='home'>
          <img
            onClick={()=>{navigate(-1)}}
            src={arrow}
            className="arrowBack"
            alt="back-arrow"
            style={{transform: 'rotate(90deg)'}}
          />
          <div>
            <img
              onClick={()=>{navigate("/home/welcome")}}
              src={symbol}
              className="logoHomeS"
              alt="petlink logo"
            />
            <img
              onClick={()=>{navigate("/home/welcome")}}
              src={wordmark}
              className="logoHomeT"
              alt="petlink logo"
            />
          </div>
          <img
            onClick={()=>{navigate("/home/welcome")}} 
            src={more}
            className="more"
            alt="more"
          />
        </header>
        <Outlet></Outlet>
        <nav className='HomeNav'>
          <ul>
            <li>
              <a>
                <img
                  onClick={()=>{navigate('/home/profile')}}
                  src={person}
                  alt="personal information"/>
              </a>
            </li>
            <li>
              <a>
                <img
                  onClick={()=>{navigate('/home/event')}}
                  src={chat}
                  alt="Communication"/>
              </a>
            </li>
            <li>
              <a>
                <img
                  onClick={()=>{navigate('/home/match')}}
                  src={heart}
                  alt="Matching "/>
              </a>
            </li>
            <li>
              <a>
                <img
                  onClick={()=>{navigate('/home/info')}}
                  src={report}
                  alt="info"/>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    :<div className='invalidAccess'>
      <img src="/img/logo/PetLink-symbol.svg" alt="PetLink-symbol" />
      <p>You need to login to view this page!</p>
      <a href="/">Go to Home</a>
    </div>
  )
}
export default Home