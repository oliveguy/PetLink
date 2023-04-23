/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';


function Event(){
  return (
    <div className='homeComponent event'>
      <h3>Recent Activity</h3>
      <div className='recentActivity eventArea'>
      <ul className='eventList'>
        <li className='eventItems'>
          <img src="/img/icons/solid_heart.png" alt="" />
          <span>Jiayu & Tori matched with you </span>
        </li>
        <li className='eventItems'>
          <img src="/img/icons/solid_heart.png" alt="" />
          <span>Collin & Henry matched with you </span>
        </li>
        <li className='eventItems'>
          <img src="/img/icons/solid_heart.png" alt="" />
          <span>Yumi & Jacky matched with you </span>
        </li>
        </ul>
      </div>
      <h3>Chat History</h3>
      <div className='chatFistory eventArea'>

      </div>
    </div>
  )
}

export default Event