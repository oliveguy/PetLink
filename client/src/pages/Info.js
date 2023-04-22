/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';


function Info(){
  return (
    <div className='homeComponent info'>
      <p>Info</p>
    </div>
  )
}

export default Info