/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';


function Event(){
  const [URL ,setURL] = useState('')
  const [allMatch ,setAllMatch] = useState([])

  let userID = sessionStorage.user_email;
  useEffect(() => {
    axios.post(`/main/profile`,{reqEmail:userID})
      .then((res) => {
        setURL(res.data.serverURL)
        axios.get(
          `/main/matched`,
          {params:{
            reqEmail: userID
          }})
        .then(res => {
          setAllMatch(res.data.allMine)
        })
        .catch(error => {
          console.error("GET Error:"+error);
        });
      })
      .catch((err) => {
        console.log("POST Error: "+err)
      });
    }, []);
  return (
    <div className='homeComponent event'>
      <h3>Recent Activity</h3>
      <div className='recentActivity eventArea'>
      <ul className='eventList'>
        {allMatch.map((each, i)=>{
          return(
            <li className='eventItems' key={i}>
              <img src={`${URL}/${allMatch[i].userPhoto}`} alt={allMatch[i].userName} />
              <span>{allMatch[i].userName+` & `+allMatch[i].pet} matched ! </span>
            </li>
            )
          })}
        </ul>
      </div>
      <h3>Chat History</h3>
      <div className='chatFistory eventArea'>

      </div>
    </div>
  )
}

export default Event