var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var adminSchema = new mongoose.Schema({
  email : {
      type: String,
      unique: true,
      required: true
  },
  name : {
      type : String,
      required : true
  },
  userType: {
    type: String, 
     required: true
  },
    hash : String,
    salt : String
});

adminSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('base64'); 
};

adminSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('base64');
    return this.hash === hash;
};

adminSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id : this._id,
        email : this.email,
        name : this.name,
        exp : parseInt(expiry.getTime()/1000), 
    }, 'thisSecret');
};

mongoose.model('Admin', adminSchema);