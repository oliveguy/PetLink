/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import '../css/base.css';
import '../css/index_style.css';
import '../css/pages.css';
import '../css/style.css';

function Match(){
  let navigate = useNavigate();
  const [URL ,setURL] = useState('')
  const [usersList, setUsersList] = useState([])
  const [heart ,setHeart] = useState('heart')
  const [fromPersonName, fromPersonSet] = useState('')
  const [fromPersonPhoto, fromPersonPhotoSet] = useState('')
  const [petName ,setPetName] = useState('')
  const [petPhoto ,setPetPhoto] = useState('')

  let userID = sessionStorage.user_email;
  useEffect(()=>{
    axios.get('/main/all')
    .then(res => {
      setUsersList(res.data)
      axios.post(`/main/profile`,{reqEmail:userID})
      .then((res) => {
        setURL(res.data.serverURL)
        fromPersonSet(res.data.user.user_fName+' '+res.data.user.user_lname);
        fromPersonPhotoSet(res.data.user.user_photo);
        setPetName(res.data.user.pet_name);
        setPetPhoto(res.data.user.pet_photo);
      })
      .catch((err) => {
        console.log("POST Error: "+err)
      });
    })
    .catch(error => {
      console.error("GET Error:"+error);
    });
    
  },[fromPersonName])
  // useEffect(()=>{
  //   axios.get('/main/all')
  //   .then(res => {
  //     setUsersList(res.data)
      
  //   })
  //   .catch(error => {
  //     console.error("GET Error:"+error);
  //   });
  // },[])
  const handleMatched = (
    toEmail,
    toPerson,
    toImage,
    toPetName,
    toPetImage) => {
    axios.post('/main/matching',{
      from:{
        fromPerson:userID,
        fromPersonName:fromPersonName,
        fromPersonPhoto:fromPersonPhoto,
        petName:petName,
        petPhoto:petPhoto
      },
      to:{
        email:toEmail,
        userName:toPerson,
        userPhoto:toImage,
        pet:toPetName,
        petPhoto:toPetImage
      }
    })
    .then((res)=>{
      if(res.data.add){
        navigate('/home/matched');
      }
    })
    .catch((err)=>{
      console.log(err)
      // navigate('/home/match');
    })
  }

  return (
    <div className='homeComponent match'>
      <div className="carousel_container">
        {/* user start */}
        {usersList.map((each, index)=>{
          return(
            <div className="user_card" key={index}>
              <div className="photo_container">
                <img
                  src={`${URL}/${usersList[index].pet_photo}`}
                  alt={usersList[index].pet_name} />
              </div>
              <div className="text_container">
                <h2>
                  {usersList[index].fname} {usersList[index].lname} & {usersList[index].pet_name}
                </h2>
                <p> {usersList[index].brief}</p>
                <div className="icon_container">
                  <img
                    onClick={()=>{
                      setHeart(index);
                      let TouserName = usersList[index].fname +' '+usersList[index].lname;
                      handleMatched(
                        usersList[index].email, //email
                        TouserName, //name
                        usersList[index].photo, // userphoto
                        usersList[index].pet_name, // petname
                        usersList[index].pet_photo // petphoto
                      )
                    }}
                    src="/img/icons/solid_heart.png"
                    className={heart == index?"red-heart":"heart"}
                    alt="heart"
                  />
                  <img
                    src="/img/icons/x.png"
                    alt="close"
                  />
                </div>
              </div>
            </div>
          )
        })}
        {/* user end */}
      </div>
    </div>
  )
}

export default Match