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

 /*module.exports.verifyEmail= function(req, res){
    if(req.params && req.params.email){
          Loc
           .findOne(req.params.email)
           .exec(function(err, user){
            sendJsonResponse(res, 200, {"Message": user.email});
            console.log("The retrieved email "+ user.email);
              /* if(user){
                sendJsonResponse(res, 200, user.email);
                console.log("The retrieved email "+ user.email);
                return;
               }
               else{
                sendJsonResponse(res, 201, {"message":"Continue creating account"});
                return;
               }
           })
    }
   
 };*/

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