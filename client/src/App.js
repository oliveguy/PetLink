/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet, Switch } from 'react-router-dom';

import './css/base.css';
import './css/index_style.css';
import './css/pages.css';
import './css/style.css';

import chat from './src-img/chat.png';
import arrow from './src-img/down_arrow_.png';
import heart from './src-img/heart.png';
import more from './src-img/moreHome.png';
import report from './src-img/report.png';
import person from './src-img/person.png';
import symbol from './src-img/PetLink-symbol.svg';
import wordmark from './src-img/PetLink-wordmark-red.svg';

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/connect" element={<LoginSignup />}>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="personalInfo" element={<PersonalInfo/>}/>
        </Route>
        <Route path="/home" element={<Home/>}>
          <Route path="welcome" element={<Welcome/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="event" element={<Event/>}/>
          <Route path="match" element={<Match/>}/>
          <Route path="info" element={<Info/>}/>
        </Route>
      </Routes>
    </div>
  );

  function Index(){
    return(
      <div id="splash_main">
        <img src="img/logo/PetLink-symbol.svg" alt="PetLink-symbol" />
        <img src="img/logo/PetLink-wordmark.svg" alt="PetLink wordmark" />
        <a onClick={()=>{navigate("/connect/login")}} className="splash_btn">Log In</a>
        <a onClick={()=>{navigate('/connect/signup')}} className="splash_btn">Sign Up</a>
      </div>
    )
  }
  function LoginSignup(){
    return (
      <div id="signUp">
        <header>
          <img src="/img/logo/PetLink-logo.svg" className="signupLogo" alt="petlink logo" onClick={()=>{navigate("/")}}/>
        </header>
        <Outlet></Outlet>
        <footer>
          <img src="/img/logo/PetLink-wordmark.svg" alt="PetLink-wordmark" />
          <p>Terms and Conditions apply.</p>
        </footer>
      </div>
    )
  }
  function Login(){
    return(
      <div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1 className="LS-title">Log In</h1>
            <input type="text" placeholder="Your email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot password?</a>
            <input onClick={()=>{navigate('/home/welcome')}}type="submit" value="Log In" />
          </form>
            <a onClick={()=>{navigate('/connect/signup')}}>Don't you have ID?</a>
        </div>
      </div>
    )
  }
  function Signup(){
    return(
      <div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1 className="LS-title">Sign up</h1>
            <input type="text" placeholder="Your email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Re-enter Your Password" />
            <input type="submit" value="Sign Up" className='signupBtn'onClick={()=>{navigate('/connect/personalInfo')}}/>
          </form>
        </div>
      </div>
    )
  }
  function PersonalInfo(){
    return(
      <div className="personalInfo">
        <h3>Personal Information</h3>
        <input type="text" placeholder='Owner First Name' />
        <input type="text" placeholder='Owner Last Name' />
        <input type="date" placeholder='Date of Birth' />
        <div className="cat-dog">
          <span>I have a:</span>
          <div>
            <input type="radio" name="pet-kind" id="Dog"/>
            <label htmlFor="Dog">Dog</label>
          </div>
          <div>
            <input type="radio" name="pet-kind" id="Cat"/>
            <label htmlFor="Cat">Cat</label>
          </div>
        </div>
        <label for="file" className='photoUpload'>&#10149; Upload Profile Photo</label>
        <input type="file" name="owner_photo" accept="image/*" id="file"/>
        
        {/* PET */}
        <h3>Pet Information</h3>
        <input type="text" placeholder='Pet Name' />
        <select name="pet_gender" id="pet_gender">
          <option value="gender">Pet's Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select name="pet_status" id="pet_status">
          <option value="status">Pet's Neuter/Spay Status</option>
          <option value="true">Neutered or Spayed</option>
          <option value="false">Not Neutered or Spayed</option>
        </select>
        <select name="interest" id="interest">
          <option value="status">I'm interested in ..</option>
          <option value="play-date">Only pet play dates</option>
          <option value="rescue">Only rescuing an animal</option>
          <option value="both">Both</option>
        </select>
        <label for="file" className='photoUpload'>&#10149; Upload Your Pet Photo</label>
        <input type="file" name="pet_photo" accept="image/*" id="file"/>
      
      <input onClick={()=>{navigate('/home/welcome')}}type="submit" value="Save Information" />

      </div>
    )
  }

  function Home(){
    return(
      <div className='homeBody'>
        <header className='home'>
          <img src={arrow} className="arrowBack" alt="back-arrow" onClick={()=>{navigate(-1)}}style={{transform: 'rotate(90deg)'}}/>
          <div>
            <img src={symbol} className="logoHomeS" alt="petlink logo" onClick={()=>{navigate("/home/welcome")}}/>
            <img src={wordmark} className="logoHomeT" alt="petlink logo" onClick={()=>{navigate("/home/welcome")}}/>
          </div>
          <img src={more} className="more" alt="more" onClick={()=>{navigate("/home/welcome")}} />
        </header>
        <Outlet></Outlet>

        <nav className='HomeNav'>
          <ul>
            <li>
              <a>
                <img src={person} onClick={()=>{navigate('/home/profile')}} alt="personal information"/>
              </a>
            </li>
            <li>
              <a>
                <img src={chat} onClick={()=>{navigate('/home/event')}} alt="Communication"/>
              </a>
            </li>
            <li>
              <a>
                <img src={heart} onClick={()=>{navigate('/home/match')}} alt="Matching "/>
              </a>
            </li>
            <li>
              <a>
                <img src={report} onClick={()=>{navigate('/home/info')}} alt="info"/>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
  function Welcome(){
    return(
      <div className='homeComponent welcome'>
        <p>WELCOME</p>
      </div>
    )
  }
  function Profile(){
    return (
      <div className='homeComponent profile'>
        <p>Profile</p>
      </div>
    )
  }
  function Event(){
    return (
      <div className='homeComponent event'>
        <p>Event</p>
      </div>
    )
  }
  function Match(){
    return (
      <div className='homeComponent match'>
        <p>Match</p>
      </div>
    )
  }
  function Info(){
    return (
      <div className='homeComponent info'>
        <p>Info</p>
      </div>
    )
  }
}

export default App;
// Permision Denied Issue(MAC)
// sudo chmod +x node_modules/.bin/react-scripts