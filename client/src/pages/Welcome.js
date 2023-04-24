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
  const [user_fName, setuser_fName] = useState('')
  const [user_lname, setuser_lname] = useState('')
  const [URL ,setURL] = useState('')
  const [usersList, setUsersList] = useState([])
  const [allMatch ,setAllMatch] = useState([])

  let userID = sessionStorage.user_email;
  useEffect(() => {
    axios.post(`/main/profile`,{reqEmail:userID})
      .then((res) => {
        setuser_fName(res.data.user.user_fName)
        setuser_lname(res.data.user.user_lname)
        setURL(res.data.serverURL)
        // ALL NEW FRIENDS
        axios.get('/main/all')
        .then(res => {
          setUsersList(res.data)
        })
        .catch(error => {
          console.error("GET Error:"+error);
        });
        // EVENT LISTING
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

    return(
      <div className='homeComponent welcome'>
        <h3>Welcome! <b><i>{user_fName+" "+user_lname}</i></b></h3>
        <div className='recentEvent'>
          <p>Recent Event</p>
          <ul className='eventList'>
            {allMatch.map((each, i)=>{
              return(
                <li className='eventItems' key={i}>
                  <img src={`${URL}/${allMatch[i].userPhoto}`} alt={allMatch[i].userName} />
                  <span>{allMatch[i].userName+` & `+allMatch[i].pet} matched with you </span>
                </li>
                )
              })
            }
          </ul>
        </div>
        <p>Find New Furry Friends</p>
        <ul className='newFriends'>
        {usersList.map((each, index)=>{
          return(
            <li key={index}>
              <img
              src={`${URL}/${usersList[index].pet_photo}`}
              alt="user_photo" />
              <span>{usersList[index].pet_name}</span>
            </li>
          )
        })
        }
        </ul>
        <p>Fenced Dog Parks</p>
      </div>
    )
  } 

export default Welcome