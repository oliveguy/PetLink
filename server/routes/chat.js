const express = require("express");
const app = express();
const router = express.Router();

const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

// const bcrypt = require("bcrypt");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get("/",(req,res)=>{
  res.render('chat.ejs')
})

/////////// CHAT START

io.on('connection',(socket)=>{
  console.log('A user connected')

  socket.on('userMSG',(data)=>{
    console.log(`server recieved: ${data}`)
    io.emit('broadcast',data)
  })

})
/////////// CHAT END

module.exports = router;