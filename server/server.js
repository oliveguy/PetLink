const express = require('express');
const app = express();
require('dotenv').config();
const DBURL = process.env.MONGODB;
const mongoose = require('mongoose');
const router = express.Router();

// chat const set
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

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
app.use(express.urlencoded({ extended: true })); // req.body 전송 시 필수 !!
app.use(express.json()); // req.body 전송 시 필수 !!
app.set('view engine', 'ejs');
app.use(express.static("public"));

// ~/USER ROUTING()
app.use("/user", require("./routes/user.js"));
// ~/MAIN ROUTING()
app.use("/main", require("./routes/main.js"));
// ~CHAT ROUTING()
// app.use("/chat", require("./routes/chat.js"));


// First Landing page
app.get('/', (req,res)=>{
  res.render('index.ejs');
})

/////////// CHAT START
app.get("/chat",(req,res)=>{
  res.render('chat.ejs')
})
io.on('connection',(socket)=>{
  console.log('A user connected')

  socket.on('userMSG',(data)=>{
    console.log(`server recieved: ${data}`)
    io.emit('broadcast',data)
  })

})
/////////// CHAT END

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