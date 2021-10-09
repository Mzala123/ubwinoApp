var mongoose = require('mongoose');
var Appointment = mongoose.model('Event');
var User = mongoose.model('User');

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.allAppointmentsByStatus = function (req, res) {
    console.log("Hello world");
    var eventStatus = req.query.eventStatus;
    var userType = req.query.userType;

    if (!eventStatus || !userType) {
        sendJsonResponse(res, 404, { "message": "event status and userType required" });
    }
    else if (userType === "Admin") {
        Appointment
            .find({eventStatus:eventStatus})
            .exec(function (err, appointment) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                }
                else {
                    console.log(eventStatus);
                    sendJsonResponse(res, 200, appointment);
                    console.log(appointment);
                }
            });

    }
    else if(userType !== "Admin"){
        sendJsonResponse(res, 404, {"message":"incorrect usertype"});
    }
    /* else if(eventStatus ||  userType){
         User
           .find({eventStatus:{$elemMatch:{userType:userType}}})
           .exec(function(err, user){
               if(err){
                  sendJsonResponse(res, 404, {"message":"you're not the admin"})
               }
               else if(user){
                  console.log("user is " +user);
                  Appointment
                    .find({eventStatus:{$elemMatch:{eventStatus}}})
                    .exec(function(err, appointment){
                        if(err){
                         sendJsonResponse(res, 404, err);
                        }
                        else{
                            sendJsonResponse(res, 200, appointment);
                            console.log(appointment);
                        }
                    });
               }
           });
     }
     else{
         sendJsonResponse(res, 404, {"message":"something went wrong"});
     }*/
}