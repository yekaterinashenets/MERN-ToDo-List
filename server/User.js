// User.js
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var UserSchema = Schema({  
  name: {
    type: String,
    required: [true, "is required"]
  },
  email: {
    type: String,
    required: [true, "is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "is required"]
  }
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');