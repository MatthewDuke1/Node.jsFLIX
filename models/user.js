const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
      type:String,
      required:true,
      minlength: 5,
      maxlength: 50,
      unique: true
  },
  password: {
    type:String,
    required:true,
    minlength: 5,
    maxlength: 50,
    unique: 1024
},
  isAdmin: Boolean,
  roles: [],
  operations: []
}));

userchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userschema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    name: Joi.string().min(5).max(250).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;