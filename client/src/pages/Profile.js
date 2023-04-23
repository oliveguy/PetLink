/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';


function Profile(){
  const [user_fName, setuser_fName] = useState('')
  const [user_lname, setuser_lname] = useState('')
  const [user_dob, setuser_dob] = useState('')
  const [user_brief, setuser_brief] = useState('')
  const [user_photo, setuser_photo] = useState('')
  const [pet_kind, setpet_kind] = useState('')
  const [pet_name, setpet_name] = useState('')
  const [pet_gender, setpet_gender] = useState('')
  const [pet_pstatus, setpet_pstatus] = useState('')
  const [pet_interest, setpet_interest] = useState('')
  const [pet_photo, setpet_photo] = useState('')
  const [URL ,setURL] = useState('')

  let userID = sessionStorage.user_email;
  useEffect(() => {
    axios.post(`/main/profile`,{reqEmail:userID})
      .then((res) => {
        setuser_fName(res.data.user.user_fName)
        setuser_lname(res.data.user.user_lname)
        setuser_dob(res.data.user.user_dob)
        setuser_brief(res.data.user.user_brief)
        setuser_photo(res.data.user.user_photo)
        setpet_kind(res.data.user.pet_kind)
        setpet_name(res.data.user.pet_name)
        setpet_gender(res.data.user.pet_gender)
        setpet_pstatus(res.data.user.pet_pstatus)
        setpet_interest(res.data.user.pet_interest)
        setpet_photo(res.data.user.pet_photo)
        setURL(res.data.serverURL)
      })
      .catch((err) => {
        console.log(err)
      });
    }, []);
    
  const[expand,setExpand]=useState('sub')

  return (
    <div className='homeComponent profile'>
      <h3>My Profile</h3>
      <section className='photoField'>
        <div id="user_pic_wrap">
          <span className='userName'>{user_fName}</span>
          <div className="user_pic" id="profile_user">
            <img
              src={`${URL}/${user_photo}`}
              alt={user_fName}
            />
          </div>
          <span className='petName'>{pet_name}</span>
          <div className="user_pic" id="profile_pet">
            <img
              src={`${URL}/${pet_photo}`}
              alt={pet_name}
            />
          </div>
        </div>
      </section>
      <section className="userField">
        <ul>
          <li onClick={()=>{setExpand("sub");setExpand(0)}}>Personal Information<span>+</span></li>
          <li className={expand==0?"show":"sub"}>
            <ul>
              <li>User name: <b>{user_fName + user_lname}</b></li>
              <li>Date of Birth: <b>{user_dob}</b></li>
              <li>Pet Kind: <b>{pet_kind}</b></li>
              <li>Pet Name: <b>{pet_name}</b></li>
              <li>Pet Gender: <b>{pet_gender}</b></li>
              <li>Pet Status: <b>{pet_pstatus == true?'Neutered or Spayed':'Not Neutered or Spayed'}</b></li>
              <li>Interested in: <b>{pet_interest}</b></li>
            </ul>
          </li>
          <li onClick={()=>{setExpand("sub");setExpand(1)}}>Preferences<span>+</span></li>
          <li className={expand==1?"show":"sub"}>
            Preferred Match Type:
            <input type="checkbox" name="" id="Dog" /><label htmlFor='Dog'>Dog</label>
            <input type="checkbox" name="" id="Cat" /><label htmlFor='Cat'>Cat</label>
          </li>
          <li onClick={()=>{setExpand("sub");setExpand(2)}}>Privacy<span>+</span></li>
          <li className={expand==2?"show" +" "+"privacy":"sub"}>
            <h3>Privacy Statement</h3>
            <p>
              We take your privacy seriously and are committed to protecting your
              personal information. When you sign up for our Pet Dating App, we
              collect basic information such as your name, email address, and pet
              preferences. This information is used to match you with other pet
              owners in your area and improve your overall experience on the app.
              We will never share your personal information with third parties
              without your consent.
            </p>
            <p>
              In addition to basic information, we may collect data on your app
              usage, such as the number of matches you receive and the frequency
              of your logins. This information is used to improve the app's
              performance and offer better recommendations for potential matches.
              We may also use cookies and other tracking technologies to
              personalize your experience on the app. If you have any questions or
              concerns about our Privacy Statement, please don't hesitate to
              contact us. We value your feedback and are committed to providing a
              safe and enjoyable experience for all of our users.
            </p>
          </li>
          <li>Allow Notifications<input type="checkbox" name="" id="" /></li>
        </ul>
      </section>
    </div>
  )
}

export default Profile