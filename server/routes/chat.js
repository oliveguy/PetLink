const express = require('express');
const app = express();
const http = require('http').createServer(app);
const router = express.Router();

// const bcrypt = require("bcrypt");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const io = require("socket.io")(http,{
  cors: {
    origin:'*',
    methods:["GET","POST"],
  }
});
io.on('connection',(socket)=>{
  console.log(`Connected ID=${socket.id}`)

  socket.on('userMSG',(data)=>{
    io.emit('broadcast',data)
  })
  socket.on('disconnect',()=>{
    console.log(`Disconnect ID=${socket.id}`)
  })
})
router.get("/",(req,res)=>{
  console.log(res)
})

/////////// CHAT START


/////////// CHAT END

module.exports = router;