// ~/main/ ROUTE
const express = require("express");
const app = express();
const router = express.Router();
// const bcrypt = require("bcrypt");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// MAIN-ROOT Page
router.get("/",(req,res)=>{
  // LOGIN CHECK
  res.render('main.ejs');
})
  // Profile Tab
  router.get('/profile',(req,res)=>{
    res.render('profile.ejs');
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