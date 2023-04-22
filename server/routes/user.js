// --/user/ ROUTE
const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// File Handler Setting
const multer = require('multer');
const storage = multer.diskStorage({
    destination(req, file, callback){
      callback(null, './upload');
    },
    filename(req, file, callback){
      callback(null, `${Date.now()}-${file.originalname}`)
    }
  }
)
const upload = multer({ storage });
// SIGNUP Page
  router.post(
    "/signup",
    async (req, res) => {
    const { user_email, user_password} = req.body;
    try {
      let user = await User.findOne({ user_email });
      if (user){
        return res
        .status(400)
        .json({ errors: [{ msg: "The email already exists" }] });
      }
      user = new User({
        user_email,
        user_password
      });
      user.user_password = await bcrypt.hash(user_password, 10);

      await user.save();
      // SESSION SAVED
      req.session.userEmail = user_email;
      req.session.save()
      res.status(200).json({userID:user_email});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  )
// INPUT Personal Info
router.post(
  '/signup/personal',
  upload.fields([{ name: 'userPic' }, { name: 'petPic' }]),
  async (req,res)=>{
    let userPicFileName;
    let petPicFileName;
    if(!req.files['userPic']){
      userPicFileName = null;
    } else if (!req.files['petPic']){
      petPicFileName = null;
    } else if(req.files['userPic'] && req.files['petPic']){
      userPicFileName = req.files['userPic'][0].filename;
      petPicFileName = req.files['petPic'][0].filename;
    }
    try {
      let user = await User.findOneAndUpdate(
        { user_email: req.body.user_email},
        { 
          user_fName: req.body.fname,
          user_lname:req.body.lname,
          user_dob:req.body.bod,
          user_brief:req.body.brief,
          user_photo:userPicFileName,
          pet_kind:req.body.petKind,
          pet_name:req.body.petName,
          pet_gender:req.body.petGender,
          pet_pstatus:req.body.petStatus,
          pet_interest:req.body.petInterst,
          pet_photo:petPicFileName
        }
        );

      res.json({regis:true})
    }
    catch (err) {
      console.log(err)
    }
  })


// LOGIN
  router.post(
    "/login",
    async(req,res)=>{
      let inputID = req.body.loginID;
      let inputPWD = req.body.loginPWD;
      
      const user = await User.findOne({user_email:inputID});
    
    if(!user){
      return res.status(401).json({msg:'noID'});
    }
    let compare = bcrypt.compareSync(inputPWD, user.user_password)
    if(compare){
      res.status(200).json({message:'found and pwd correct', data:user.user_email
    });
      await user.save();
    }
    if(user && compare == false){
      return res.status(401).json({msg:'nopassword'});
    }
  })

module.exports = router;