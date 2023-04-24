/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function Matched(){
  let navigate = useNavigate();
  const [URL ,setURL] = useState('')
  const [match ,setMatch] = useState([]);

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
          setMatch([res.data])
          console.log(res.data)
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
    <div className='homeComponent matched'>
      {match.map((each,i)=>{
        return(
        <>
          <h3 className='MatchHeading'>It's a Match!</h3>
          <div className='matchedText'>
            <p>You matched with</p>
            <p className='largeText'><b>{match[i].mine.userName} & {match[i].mine.pet}</b></p>
          </div>
          <div className='matchedPhoto'>
            <span className='matchPicWrapper userPic'>
              <img src={`${URL}/${match[i].mine.userPhoto}`} alt={match[i].mine.userName} className="matchedPhoto userPic"/>
            </span>
            <span className='matchPicWrapper petPic'>
              <img src={`${URL}/${match[i].mine.petPhoto}`} alt={match[i].mine.pet} className="matchedPhoto petPic" />
            </span>
          </div>
          <ul className='cta'>
            <li>Send Message</li>
            <li onClick={()=>{navigate(-1)}}>Continue Search</li>
          </ul>
        </>
        )
      })}
    </div>
  )
}

export default Matched