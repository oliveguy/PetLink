const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  owner:{
    fName:{
          type: String,
          required: true
    },
    lname:{
      type: String,
      required: true
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
      type: String,
      required: true
    },
    location:{
      type: String,
      required: true
    }
  },
  pet:{
    kind:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    gender:{
      type: String,
      required: true
    },
    pstatus:{
      type: String,
      required: true
    },
    interest:{
      type: String,
      required: true
    }
  }
})

module.exports = User = mongoose.model("user",userSchema);
// https://iridescent-zeal.tistory.com/232