var passport = require('passport');
var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };

 module.exports.registerAdmin = function(req, res){
    if(!req.body.name || !req.body.email || !req.body.password || !req.body. userType){
        sendJsonResponse(res, 404, {
          "message" : "All fields required"  
        });
        console.log("admin registration ikani kaye ma details baba");
        return;
    }
    var admin = new Admin();

    admin.name = req.body.name;
    admin.email = req.body.email;
    admin.userType = req.body.userType;

    admin.setPassword(req.body.password);

    admin.save(function(err){
        var token;
        if(err){
            sendJsonResponse(res, 404, err);
        }
        else{
            token = admin.generateJwt();
            sendJsonResponse(res, 200, {
                "token" : token
            })
        }
    })
 }

 module.exports.loginAdmin = function(req, res){
    if(!req.body.email || !req.body.password){
        sendJsonResponse(res, 404, {
            "message" : "All fields required! Admin section ino hehe"
        });
        return;
    }
    passport.authenticate('local', function(err, admin, info){
      var token;
      if(err){
          sendJsonResponse(res, 404, err);
          return;
      }

      if(admin){
         token = admin.generateJwt();
         sendJsonResponse(res, 200, {
             "token" : token
         });
      }
      else{
          sendJsonResponse(res, 401, info);
      }
    })(req, res);
 }