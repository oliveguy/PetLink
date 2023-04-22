/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';

function Match(){
  return (
    <div className='homeComponent match'>
      <div className="carousel_container">
        {/* user start */}
        <div className="user_card">
          <div className="photo_container">
            <img src="/img/photos/cat_man_2.jpg" alt="user_photo" /> {/* DYNAMIC */}
          </div>
          <div className="text_container">
            <h2>Tristan & Rio, 28 & 2</h2> {/* DYNAMIC */}
            <p> {/* DYNAMIC */}
              I work full-time as a barista manager. He lives a very laid
              back, easy going life with his cat Rio, who he rescued in June of
              2020.
            </p>
            <div className="icon_container">
              <img src="/img/icons/solid_heart.png" alt="" />
              <img src="/img/icons/x.png" alt="" />
            </div>
          </div>
        </div>
        {/* user end */}
      </div>
    </div>
  )
}

export default Match