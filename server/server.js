const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const DBURL = process.env.MONGODB;
const mongoose = require('mongoose');
const http = require('http').createServer(app);

// MONGO DB Connection
let db = mongoose.connection;
db.on('error', console.error);
db.once('open',()=>{
  console.log('MongoDB Connected!')
})
mongoose.connect(DBURL, {
  dbName: 'petlink',
  useUnifiedTopology: true,
  useNewUrlParser: true
})

// POST
app.use(express.urlencoded({ extended: true })); // req.body 전송 시 필수 !!
app.use(express.json()); // req.body 전송 시 필수 !!

app.use(express.static("public"));

// API
  // ~/USER ROUTING()
  app.use("/user", require("./routes/user.js")); // signup(POST) / login(POST) / register photos(POST)
  // ~/MAIN ROUTING()
  app.use("/main", require("./routes/main.js")); // view profile(GET)-change PW-photo(UPDATE) / chat history(GET) / user-pet listing(GET)
  // ~CHAT ROUTING()
  app.use("/chat", require("./routes/chat.js")); // chat list(GET) / Socket.io connect / 


// First Landing page to React App
// app.js & React routing
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})


http.listen(8080,()=>{
  console.log('listening on 8080');
})

// let userInfo ={
//   owner:{
//     fName:'',
//     lname:'',
//     dob:'0000-00-00',
//     location:''
//   },
//   pet:{
//     kind:'',
//     name:'',
//     gender:'',
//     pstatus:'',
//     interest:''
//   }
// }

// check up

// Shift + Alt + F -> Formatter

// WIN -> MAC
// % rm -rf node_modules/
// % npm update

// MAC->WIN
// > npm rebuild bcrypt --build-from-source

// Google Cloud Re-Deploy
// gcloud init
// gcloud app deploy

// Socket.io
// https://poiemaweb.com/nodejs-socketio
// +React
// https://youngbean96.tistory.com/2

// Mock-up
// https://www.figma.com/file/qfnSgksEjkeVekaadToNa2/capstone?node-id=0-1&t=poE1KzKLltF5L0eq-0