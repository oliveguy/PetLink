/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import emoji from '../src-img/imoji.png';
import camera from '../src-img/camera.png';
import sendBtn from '../src-img/sendBtn.png';

import io from 'socket.io-client';
// const socket = io('http://localhost:8080/chat');

function Chat(){
  let navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('Type message here');
  const [chatList, setChatList] = useState([])
  const [URL ,setURL] = useState('')
  const [userImg ,setUserImg] = useState('')

  const updateChat = () => {
    let copy = [...chatList];
    copy.push(inputValue)
    setChatList(copy)
    setInputValue('')
  }
  let userID = sessionStorage.user_email;
  useEffect(() => {
    axios.post(`/main/profile`,{reqEmail:userID})
      .then((res) => {
        setURL(res.data.serverURL)
        setUserImg(res.data.user.user_photo)
      })
      .catch((err) => {
        console.log("POST Error: "+err)
      });
    }, []);
  return(
    <div className ="homeComponent chat">
      <h3>Chat</h3>
      <ul className="chatWindow">
        {chatList.map((msgs,i)=>{
          return (
            <li key={i}>
              <span className='msg'>{msgs}</span>
              <img src={URL+'/'+userImg} alt="user" /></li>
          )
        })}
      </ul>
      <div className="inputArea">
        <input
          onChange={(e)=>{setInputValue(e.target.value)}}
          onClick={()=>{setInputValue('')}}
          onKeyPress={(e)=>{
            e.key === "Enter" && updateChat()
          }}
          value={inputValue}
          type="text"
          className="chatInput"
        />
        <div className="inputControl">
          <img src={emoji} alt="emoji" />
          <img src={camera} alt="photo" />
          <img 
            src={sendBtn}
            alt="send button"
            onClick={()=>{updateChat()}}
          />
        </div>
      </div>
    </div>
  )
}

export default Chat