const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")


  

const UserSchema = new Schema({
  userName:{
      type:String,
      required:true,
  },
  email:{
      type:String,
      required:true,
      unique:true
  },
  password:{
      type:String,
      requited:true
  },
  date:{
      type:Date,
      default:Date.now
  },
  token:{
      type:String,
      default:null
  }
    
});

 UserSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
}) 


// Export the model
module.exports = mongoose.model('User', UserSchema);