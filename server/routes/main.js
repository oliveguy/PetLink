// ~/main/ ROUTE
const express = require("express");
const app = express();
const router = express.Router();
// const bcrypt = require("bcrypt");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// MAIN-ROOT Page
router.get("/",(req,res)=>{

})
  // Profile Tab
  router.post('/profile',
  async(req,res)=>{
    const user = await User.findOne({user_email:req.body.reqEmail});
    res.status(200).json(user)
  })
  // Communication Tab
  router.get('/communication',(req,res)=>{
    res.render('communication.ejs');
  })
  // Match Tab
  router.get('/match',(req,res)=>{
    res.render('match.ejs');
  })
    router.get('/match/chat',(req,res)=>{
      res.render('chat.ejs');
    })
  // Info page
  router.get('/info',(req,res)=>{
    res.render('info.ejs');
  })

module.exports = router;