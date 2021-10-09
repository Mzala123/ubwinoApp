var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Admin = mongoose.model('Admin')

passport.use(new LocalStrategy({
     usernameField: 'email'
    },
    function(username, password, done){
        User.findOne({ email: username}, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false,{
                  message: 'Incorrect username.'
                });
            }
            if(!user.validPassword(password)){
                return done(null, false,{
                    message: 'Incorrect password.'
                })
            }
            return done(null, user);
        });
    }
    ));

passport.use(new LocalStrategy({
        usernameField: 'email'
       },
       function(username, password, done){
           Admin.findOne({ email: username}, function(err, admin){
               if(err){
                   return done(err);
               }
               if(!admin){
                   return done(null, false,{
                     message: 'Incorrect username.'
                   });
               }
               if(!admin.validPassword(password)){
                   return done(null, false,{
                       message: 'Incorrect password.'
                   })
               }
               return done(null, admin);
           });
       }
    ));