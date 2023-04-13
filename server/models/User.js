const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  owner:{
    fName:{
      type: String
    },
    lname:{
      type: String
    },
    email:{
      type: String,
      required: true,
      unique:true
    },
    password:{
      type: String,
      required: true
    },
    dob:{
      type: String
    },
    photo:{
      type: String
    }
  },
  pet:{
    kind:{
      type: String
    },
    name:{
      type: String
    },
    gender:{
      type: String
    },
    pstatus:{
      type: String
    },
    interest:{
      type: String
    }
  }
})

module.exports = User = mongoose.model("user",userSchema);
// https://iridescent-zeal.tistory.com/232