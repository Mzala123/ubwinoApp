var mongoose = require('mongoose');
var Appointment = mongoose.model('Event');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };

 module.exports.appointmentCreate= function(req, res){
    if(!req.body.clientName || !req.body.eventDescription || !req.body.eventType){
        sendJsonResponse(res, 404, {
          "message" : "All fields required"  
        });
        return;
    }
    Appointment.create({
        clientName: req.body.clientName,
        eventType: req.body. eventType,
        eventDescription: req.body.eventDescription,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        /*status: req.body.status*/
      }, function(err, appointment){
         if(err){
             sendJsonResponse(res, 404, err);
             console.log(err);
         }
         else{
             sendJsonResponse(res, 201, appointment);
         }
      });

      //sendJsonResponse(res, 200, {"Status":"Success"});
 };



 module.exports.cancelAppointment = function(req, res){
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
                appointment.eventStatus = "Cancelled";
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


 module.exports.appointmentByName = function(req, res){
     var name = req.query.name;
     var email = req.query.email;
     if( !name || !email){
         sendJsonResponse(res, 404, {"message":"name & email are required"});
     }
      else 
        { 
          Appointment
            .find({clientName:{$elemMatch:{email, name}}})
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
            })
     
        }
 }

 module.exports.appointmentReadOne = function(req, res){
     
}

