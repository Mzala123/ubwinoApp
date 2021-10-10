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
     user.userType = req.body.userType;

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


module.exports.allClients = function(req, res){
       User
         .find({})
         .exec(function(err, user){
             if(err){
                  sendJsonResponse(res, 404, err);
             }
             else{
                 sendJsonResponse(res, 201, user);
                 console.log(user);
             }
         })
}

module.exports.removeClient = function(req, res){
      
    var clientid = req.params.clientid;
    var id = mongoose.Types.ObjectId(clientid);
    clientid === User._id;
     
    if(!clientid){
        sendJsonResponse(res, 404, {"message":"client id required"});
    }
    else{
         User
           .findByIdAndRemove(clientid)
           .exec(function(err, user){
               if(err){
                   sendJsonResponse(res, 404, err);
               }
               else{
                   sendJsonResponse(res, 204, null);
               }

           });
    }
}

 module.exports.forgotPassword = function(req, res){
         var email = req.body.email;
         if(!email){
             sendJsonResponse(res, 404, {"message": "email not found, add email"});
         }
         User
          .findOne({email: email})
          .exec(function(err, user){
              if(err){
                sendJsonResponse(res, 404, {"message": "User email does not exist"});
              }
              var token;
              token = user.generateJwt({_id : user._id});
          })
 }