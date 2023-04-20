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
      callback(null, '../upload');
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
      res.status(200).json({registration:true});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  )
// INPUT Personal Info
router.post(
  '/signup/personal',
  (req,res)=>{

  }
)
// LOGIN
  router.post("/signin",(req,res)=>{
    console.log('Login POST with:'+req.body);
    // REDIRECT to MAIN.ejs with login status
  })

module.exports = router;