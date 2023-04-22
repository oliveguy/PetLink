/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';


function Welcome(){
    let navigate = useNavigate();
    return(
      <div className='homeComponent welcome'>
        <p>WELCOME</p>
      </div>
    )
  } 

export default Welcome