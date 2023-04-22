/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';


function Profile(){
  return (
    <div className='homeComponent profile'>
      <p>Profile</p>
    </div>
  )
}

export default Profile