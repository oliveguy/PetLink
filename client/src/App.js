/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

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
          <img
            src="/img/logo/PetLink-logo.svg"
            className="signupLogo"
            alt="petlink logo"
            onClick={()=>{navigate("/")}}
          />
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
    const [loginID, setLoginID] = useState('');
    const [loginPWD, setLoginPWD] = useState('');
    const [loginMsg, setloginMsg] = useState('');
    const [alert, setAlert] = useState('signupMsg');
    const handleLogin = (e) =>{
      e.preventDefault();
      if(loginID === ''){
        setloginMsg('Type your email')
        setAlert('signupMsg signup-alert')
      } else if(loginPWD === ''){
        setloginMsg('Type your password')
        setAlert('signupMsg signup-alert')
      } else {
        axios.post('/user/login',{loginID,loginPWD})
        .then(res=>{
          if(res.status === 200){
            sessionStorage.setItem('user_email', res.data.data);
            sessionStorage.setItem('firstUser', false);
            navigate("/home/welcome");
          }
        })
        .catch((err)=>{
          if(err.response.data.msg = "noID"){
            setloginMsg('Incorrect email')
            setAlert('signupMsg signup-alert')
          } else if (err.response.data.msg = "nopassword"){
            setloginMsg('Incorrect password')
            setAlert('signupMsg signup-alert')
          }
        })
      }
    }
    return(
      <div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1 className="LS-title">Log In</h1>
            <span className={alert}>{loginMsg}</span>
            <input onChange={(e)=>{setLoginID(e.target.value)}} value={loginID} type="text" placeholder="Your email" />
            <input onChange={(e)=>{setLoginPWD(e.target.value)}} value={loginPWD} type="password" placeholder="Password" />
            <a href="#">Forgot password?</a>
            <input type="submit" value="Log In" />
          </form>
            <a onClick={()=>{navigate('/connect/signup')}}>Don't you have ID?</a>
        </div>
      </div>
    )
  }

  function Signup(){
    const [user_email, setEmail] = useState('');
    const [user_password, setPWD] = useState('');

    const [reTypePWD, setRetypePWD] = useState('');
    const [signupMsg, setSignupMsg] = useState('');
    const [alert, setAlert] = useState('signupMsg');

    const handleSubmit = (e) => {
      e.preventDefault();
      if(user_password === ''|| reTypePWD ===''){
        setSignupMsg('Enter your ID or password')
        setAlert('signupMsg signup-alert')
      } else if(user_password !== reTypePWD){
        setSignupMsg('Check your password')
        setAlert('signupMsg signup-alert')
      } else {
        axios.post('/user/signup',{user_email,user_password})
        .then(res=>{
          if(res.status == 200){
            sessionStorage.setItem('user_email', res.data.userID)
            navigate('/connect/personalInfo')
          }
        })
        .catch((err)=>{
          if(err.response.status == 400){
            setSignupMsg('The email you typed in already existed!')
            setAlert('signupMsg signup-alert')
          }
        })
      }
    }
    return(
      <div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1 className="LS-title">Sign up</h1>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={user_email}
              name="input-email"
              type="text"
              placeholder="Your email" />
            <input
              onChange={(e)=>setPWD(e.target.value)}
              value={user_password}
              name="input-password"
              type="password"
              placeholder="Password" />
            <input
              onChange={(e)=>{setRetypePWD(e.target.value)}}
              value={reTypePWD}
              type="password"
              placeholder="Re-enter Your Password" />
              <span className={alert}>{signupMsg}</span>
            <input
              type="submit" 
              value="Sign Up"
              className='signupBtn'
            />
          </form>
        </div>
      </div>
    )
  }
  function PersonalInfo(){
    const [files, setFiles] = useState([null, null]);
    const [previewUrls, setPreviewUrls] = useState([null, null]);
    const handleFileChange = (e, index) => {
      const selectedFile = e.target.files[0];
      let newFiles = [...files];
      newFiles[index] = selectedFile;
      setFiles(newFiles);
      if (selectedFile) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          let newPreviewUrls = [...previewUrls];
          newPreviewUrls[index] = fileReader.result;
          setPreviewUrls(newPreviewUrls);
        };
        fileReader.readAsDataURL(selectedFile);
      }
    }
    

  const [user_email, setemail] = useState(sessionStorage.user_email);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [bod, setBod] = useState('');
  const [brief, setBrief] = useState('');
  //  RADIO DOG-CAT KIND
  const [petKind, setPetKind] = useState('');
  useEffect(() => {
    console.log(petKind)
  }, [petKind]);
  const handleRadioChange = (e) => {
    setPetKind(e.target.value);
  };
  const [petName, setPetname] = useState('');

  //PET GENDER SELECT
  const [genderSelect, setGenderSelect] = useState('gender')
  useEffect(() => {
    console.log(genderSelect)
  }, [genderSelect]);
  const handleGender = (e) => {
    setGenderSelect(e.target.value);
  }
  //PET STATUS SELECT
  const [statusSelect, setStatusSelect] = useState('status')
  useEffect(() => {
    console.log(statusSelect)
  }, [statusSelect]);
  const handleStatus = (e) => {
    setStatusSelect(e.target.value);
  }
  //PET STATUS SELECT
  const [interestSelect, setInterestSelect] = useState('interst')
  useEffect(() => {
    console.log(interestSelect)
  }, [interestSelect]);
  const handleInterest = (e) => {
    setInterestSelect(e.target.value);
  }
  const handleSubmitPersonal = (e) => {
    e.preventDefault();
    const formData = new FormData()
      // Email for DB query
      formData.append("user_email", user_email);
      // USER
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("bod", bod);
      formData.append("brief", brief);
      formData.append("petKind", petKind);
      formData.append("userPic", files[0]);
      // PET
      formData.append("petName", petName);
      formData.append("petGender", genderSelect);
      formData.append("petStatus", statusSelect);
      formData.append("petInterst", interestSelect);

      formData.append("petPic", files[1]);

    axios.post('/user/signup/personal', formData, { withCredentials: true })
    .then(res=>{
      if(res.status == 200){
        sessionStorage.setItem('firstUser', true)
        navigate("/home/welcome")
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
    return(
      <div className="personalInfo">
        <h3>Personal Information</h3>
        <form onSubmit={handleSubmitPersonal} className='signupForm'>
            <input name="fname" onChange={(e)=>{setFname(e.target.value)}} value={fname} type="text" placeholder='Owner First Name' />
            <input name="lname" onChange={(e)=>{setLname(e.target.value)}} value={lname} type="text" placeholder='Owner Last Name' />
            <input name="bod" onChange={(e)=>{setBod(e.target.value)}} value={bod} type="date" placeholder='Date of Birth' />
            <textarea name="userBrief" onChange={(e)=>{setBrief(e.target.value)}} value={brief} cols="42" rows="5" placeholder='Brief introduction about you' className='intro'></textarea>
            <div className="cat-dog">
              <span>I have a:</span>
              <div>
                <input type="radio" onChange={handleRadioChange} value="dog" name="pet-kind" id="Dog" className='l-radio' />
                <label htmlFor="Dog">Dog</label>
              </div>
              <div>
                <input type="radio" onChange={handleRadioChange} value="cat" name="pet-kind" id="Cat" className='l-radio'/>
                <label htmlFor="Cat">Cat</label>
              </div>
            </div>
            <label htmlFor="file" className='photoUpload'>&#10149; Upload Your Profile Photo</label>
            <input type="file" name="owner_photo" accept="image/*" id="file" onChange={e=>{handleFileChange(e,0); files[0]}} />
            {previewUrls[0] && <img src={previewUrls[0]} className='previewPic' alt="user photo"/>}

            <h3>Pet Information</h3>
            <input type="text" onChange={(e)=>{setPetname(e.target.value)}} value={petName}placeholder='Pet Name' />
            
            <select value={genderSelect} onChange={handleGender} name="pet_gender" id="pet_gender">
              <option value="gender">Pet's Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            
            <select value={statusSelect} onChange={handleStatus} name="pet_status" id="pet_status">
              <option value="status">Pet's Neuter/Spay Status</option>
              <option value="true">Neutered or Spayed</option>
              <option value="false">Not Neutered or Spayed</option>
            </select>
            
            <select value={interestSelect} onChange={handleInterest} name="interest" id="interest">
              <option value="status">I'm interested in ..</option>
              <option value="play-date">Only pet play dates</option>
              <option value="rescue">Only rescuing an animal</option>
              <option value="both">Both</option>
            </select>
            <label htmlFor="file2" className='photoUpload'>&#10149; Upload Your Pet Photo</label>
            <input type="file" name="pet_photo" accept="image/*" id="file2" onChange={e=>{handleFileChange(e,1); files[1]}} />
            {previewUrls[1] && <img src={previewUrls[1]} className='previewPic' alt="pet photo"/>}

          <input type="submit" value="Save Information" />
        </form>
      </div>
    )
  }

  function Home(){
    return(
      sessionStorage.user_email ?
        <div className='homeBody'>
          <header className='home'>
            <img
              onClick={()=>{navigate(-1)}}
              src={arrow}
              className="arrowBack"
              alt="back-arrow"
              style={{transform: 'rotate(90deg)'}}
            />
            <div>
              <img
                onClick={()=>{navigate("/home/welcome")}}
                src={symbol}
                className="logoHomeS"
                alt="petlink logo"
              />
              <img
                onClick={()=>{navigate("/home/welcome")}}
                src={wordmark}
                className="logoHomeT"
                alt="petlink logo"
              />
            </div>
            <img
              onClick={()=>{navigate("/home/welcome")}} 
              src={more}
              className="more"
              alt="more"
            />
          </header>
          <Outlet></Outlet>
          <nav className='HomeNav'>
            <ul>
              <li>
                <a>
                  <img
                    onClick={()=>{navigate('/home/profile')}}
                    src={person}
                    alt="personal information"/>
                </a>
              </li>
              <li>
                <a>
                  <img
                    onClick={()=>{navigate('/home/event')}}
                    src={chat}
                    alt="Communication"/>
                </a>
              </li>
              <li>
                <a>
                  <img
                    onClick={()=>{navigate('/home/match')}}
                    src={heart}
                    alt="Matching "/>
                </a>
              </li>
              <li>
                <a>
                  <img
                    onClick={()=>{navigate('/home/info')}}
                    src={report}
                    alt="info"/>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      :<div className='invalidAccess'>
        <img src="/img/logo/PetLink-symbol.svg" alt="PetLink-symbol" />
        <p>You need to login to view this page!</p>
        <a href="/">Go to Home</a>
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
  function Info(){
    return (
      <div className='homeComponent info'>
        <p>Info</p>
      </div>
    )
  }
}

export default App;
// Permision Denied Issue(MAC) Node module authrized
// sudo chmod +x node_modules/.bin/react-scripts