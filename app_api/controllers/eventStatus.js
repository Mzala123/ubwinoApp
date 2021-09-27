var mongoose = require('mongoose');
var Appointment = mongoose.model('Event');


var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };

module.exports.appointmentByStatus = function(req, res){
    var name = req.query.name;
    var email = req.query.email;
    var eventStatus = req.query.eventStatus;
    if( !eventStatus){
        sendJsonResponse(res, 404, {"message":"eventStatus is required"});
    }
    else 
        { 
          Appointment
            .find({clientName:{$elemMatch:{email, name}}, eventStatus:eventStatus})
            .exec(function(err, appointment){
                if(!appointment){
                 sendJsonResponse(res, 404, {"message":"You havent scheduled any appointment"});
                }
                else if(err){
                 sendJsonResponse(res,404, err);
                 return;
                }
                sendJsonResponse(res, 200, appointment);
                
                console.log(appointment);
                console.log(email);
            })
     
        }
 }
