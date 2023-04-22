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
  const[menuSelect, setMenuSelect] = useState('.')
  let navigate = useNavigate();
  return(
    sessionStorage.user_email ?
      <div className='homeBody'>
        <header className='home'>
          <img
            onClick={(e)=>{navigate(-1)}}
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
                  onClick={()=>{
                    setMenuSelect('');
                    setMenuSelect(0);
                    navigate('/home/profile');
                  }}
                  src={person}
                  alt="personal information"
                  class={menuSelect == 0 ? "menuSelect": ""}
                  />
              </a>
            </li>
            <li>
              <a>
                <img
                  onClick={()=>{
                    setMenuSelect('');
                    setMenuSelect(1);
                    navigate('/home/event')
                  }}
                  src={chat}
                  alt="Communication"
                  class={menuSelect == 1 ? "menuSelect": ""}
                  />
              </a>
            </li>
            <li>
              <a>
                <img
                  onClick={()=>{
                    setMenuSelect('');
                    setMenuSelect(2);
                    navigate('/home/match');
                  }}
                  src={heart}
                  alt="Matching"
                  class={menuSelect == 2 ? "menuSelect": ""}
                  />
              </a>
            </li>
            <li>
              <a>
                <img
                  onClick={()=>{
                    setMenuSelect('');
                    setMenuSelect(3);
                    navigate('/home/info')
                  }}
                  src={report}
                  alt="info"
                  class={menuSelect == 3 ? "menuSelect": ""}
                  />
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