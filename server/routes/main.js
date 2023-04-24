// ~/main/ ROUTE
const express = require("express");
const app = express();
const router = express.Router();
// const bcrypt = require("bcrypt");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// MAIN-ROOT Page
router.get("/",(req,res)=>{
  console.log(res)
})
  // Profile Tab
  router.post('/profile',
  async(req,res)=>{
    const user = await User.findOne({user_email:req.body.reqEmail});
    
    // res.status(200).json({user,serverURL:'http://localhost:8080/upload'})
    res.status(200).json({user,serverURL:'https://formal-station-384513.uw.r.appspot.com/upload'})
    
  })
  // Match User
  router.post(
    '/matching',
    async(req,res)=>{
      try{
        // TO USER
        const user = await User.findOne(
          {user_email:req.body.to.email}
        );
        user.match.from.push(
            {
              userName:req.body.from.fromPersonName,
              userPhoto:req.body.from.fromPersonPhoto,
              pet:req.body.from.petName,
              petPhoto:req.body.from.petPhoto
            }
          )
        await user.save();
        // FROM USER
        const fromuser = await User.findOne(
          {user_email:req.body.from.fromPerson}
        );
        
        fromuser.match.mine.push(
          {
            userName:req.body.to.userName,
            userPhoto:req.body.to.userPhoto,
            pet:req.body.to.pet,
            petPhoto:req.body.to.petPhoto
          })
        await fromuser.save();

        res.json({add:true})
      }
      catch(err){
        console.log(err)
        res.json({add:false})
      }

  })
  
  router.get('/all',async(req,res)=>{
    const users = await User.find();
    let usersInfo =[];
    for(i=0;i<users.length;i++){
      usersInfo[i] = {
        email:users[i].user_email,
        fname:users[i].user_fName,
        lname:users[i].user_lname,
        photo:users[i].user_photo,
        brief:users[i].user_brief,
        pet_name:users[i].pet_name,
        pet_photo:users[i].pet_photo
      }
    }
    res.status(200).json(usersInfo)
  })

  router.get('/matched',
  async (req,res)=>{
    const user = await User.findOne({user_email:req.query.reqEmail})
    
    let allmatched = user.match.mine;
    let fourMatched = allmatched.slice(Math.max(allmatched.length-4,0))
    let userinfo = {
      allMine: fourMatched,
      mine: user.match.mine.slice(-1)[0],
      from: user.match.from.slice(-1)[0]
    }
    res.status(200).json(userinfo)
  })


module.exports = router;