var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };

 module.exports.register = function(req, res){
     if(!req.body.name || !req.body.email || !req.body.password){
         sendJsonResponse(res, 404, {
           "message" : "All fields required"  
         });
         return;
     }
     var user = new User();

     user.name = req.body.name;
     user.email = req.body.email;

     user.setPassword(req.body.password);

     user.save(function(err){
         var token;
         if(err){
             sendJsonResponse(res, 404, err);
         }
         else{
             token = user.generateJwt();
             sendJsonResponse(res, 200, {
                 "token" : token
             })
         }
     })
 }

 module.exports.verifyEmail= function(req, res){
    var email = req.query.email;
    if(!email){
        sendJsonResponse(res, 404, {"message":"email are required"});
    }
    else{
        User
          .findOne({email: email})
          .exec(function(err, user){
              if(!user){
                 sendJsonResponse(res, 201, {"Message":"You can continue as this email is not used by anyone"});
                 //return res.statusCode;
                 console.log("the status code is" ,res.statusCode);
                }
              else{
                 sendJsonResponse(res, 200, {"Message":"This email is already registered with another account"});
                 //return res.statusCode;
                 console.log("The status code is", res.statusCode);
              }

          });
    }
 };

 module.exports.login = function(req, res){
     if(!req.body.email || !req.body.password){
         sendJsonResponse(res, 404, {
             "message" : "All fields required!"
         });
         return;
     }
     passport.authenticate('local', function(err, user, info){
       var token;
       if(err){
           sendJsonResponse(res, 404, err);
           return;
       }

       if(user){
          token = user.generateJwt();
          sendJsonResponse(res, 200, {
              "token" : token
          });
       }
       else{
           sendJsonResponse(res, 401, info);
       }
     })(req, res);
 }