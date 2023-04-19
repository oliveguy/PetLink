// --/user/ ROUTE
const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SIGNUP Page
  router.post("/signup", async (req, res) => {
    const { input_userEmail, input_userPWD} = req.body;
    try {
      let user = await User.findOne({ input_userEmail });
      if (user) {
        return res
        .status(400)
        .json({ errors: [{ msg: "The email already exists" }] });
      }
      user = new User({user_email:input_userEmail,user_password:input_userPWD});
      const salt = await bcrypt.genSalt(10);
      user.user_password = await bcrypt.hash(user.user_password, salt);

      await user.save();
      res.json({registration:true});

      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  )

// LOGIN
  router.get("/signin",(req,res)=>{
    res.render('signIn.ejs')
    // REDIRECT to MAIN.ejs with login status
  })
  router.post("/signin",(req,res)=>{
    console.log('Login POST with:'+req.body);
    // REDIRECT to MAIN.ejs with login status
  })
router.get('/',(req,res)=>{
  res.send('sent!')
})
module.exports = router;