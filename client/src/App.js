/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

// CSS
import './css/base.css';
import './css/index_style.css';
import './css/pages.css';
import './css/style.css';

// PAGES
import Index from "./pages/Index.js";
import LoginSignup from "./pages/LoginSignup.js";
  import Login from "./pages/Login.js";
  import Signup from "./pages/Signup.js";
// import PersonalInfo from "./pages/PersonalInfo.js";
import Home from "./pages/Home.js";
  import Welcome from "./pages/Welcome.js";
  import Profile from "./pages/Profile.js";
  import Event from "./pages/Event.js";
  import Match from "./pages/Match.js";
  import Info from "./pages/Info.js";

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

}

export default App;
// Permision Denied Issue(MAC) Node module authrized
// sudo chmod +x node_modules/.bin/react-scripts