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
      <p>Event</p>
    </div>
  )
}

export default Event