// --/user/ ROUTE
const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SIGNUP Page
  router.post("/signup",(req,res)=>{
    async (req, res) => {
      const { userID, userPWD, userName, userEmail, loginInfo} = req.body;
      try {
        // userID compare
        let user = await User.findOne({ userID });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }
        // assign fields on user
        user = new User({
          userID,
          userPWD,
          userName,
          userEmail,
          loginInfo
        });
        
        // PWD Encripted
        const salt = await bcrypt.genSalt(10);
        user.userPWD = await bcrypt.hash(userPWD, salt);
  
        await user.save(); // save user in DB
  
        res.send("Success");
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
    // REDIRECT to Login page
  })

// LOGIN
  router.get("/signin",(req,res)=>{
    res.render('signIn.ejs')
    // REDIRECT to MAIN.ejs with login status
  })
  router.post("/signin",(req,res)=>{
    console.log('Login POST with:'+req.body);
    // REDIRECT to MAIN.ejs with login status
  })


module.exports = router;