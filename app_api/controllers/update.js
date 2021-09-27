var mongoose = require('mongoose');
var Appointment = mongoose.model('Event')
//const { ObjectId } = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };

module.exports.updateAppointment = function(req, res){
    console.log("Simufika munotu ait");
    var appointmentid = ObjectId (req.query.appointmentid);

    if(!appointmentid){
      sendJsonResponse(res, 404, {"message" : "Not found, appointmentid is required"}); 
      return; 
    }
}


module.exports.updateAppointments = function(req, res){
    console.log("Simufika munotu ait");
    var appointmentid = req.query.appointmentid;
    var ids;
    var id = mongoose.Types.ObjectId(appointmentid);
    appointmentid === Appointment._id;
     
    console.log("The id is "+id);
    if(!appointmentid){
      sendJsonResponse(res, 404, {"message" : "Not found, appointmentid is required"}); 
      return; 
    }
    Appointment
       .findById(appointmentid)
       .exec(
           function(err, appointment){
              if(!appointment){
                  sendJsonResponse(res, 404, {"message" : "Event not found"});
                }
                else if(err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
                appointment.eventStatus = "Done";
                appointment.save(function(err, appointment){
                    if(err){
                        sendJsonResponse(res, 404, err);
                    }
                    else{
                        sendJsonResponse(res, 200, appointment);
                    }
                });
           }
       )
}



