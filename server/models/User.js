const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // USER
    user_fName:{
      type: String
    },
    user_lname:{
      type: String
    },
    user_email:{
      type: String,
      index: true,
      required: true,
      unique:true
    },
    user_password:{
      type: String,
      required: true
    },
    user_dob:{
      type: String
    },
    user_brief:{
      type: String
    },
    user_photo:{
      type: String
    },
    pet_kind:{
      type: String
    },
    match:{
      from:{type:Array},
      mine:{type:Array}
    },
    // PET
    pet_name:{
      type: String
    },
    pet_gender:{
      type: String
    },
    pet_pstatus:{
      type: String
    },
    pet_interest:{
      type: String
    },
    pet_photo:{
      type: String
    }
  })

module.exports = User = mongoose.model("user",userSchema);
// https://iridescent-zeal.tistory.com/232