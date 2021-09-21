var mongoose = require('mongoose');
var Appointment = mongoose.model('Event')

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };

 /*module.exports.booking = function(req, res){
        
 };
*/
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

 module.exports.appointmentDeleteOne = function(req, res){
         var appointmentid = req.params.appointmentid;
         if(appointmentid){
             Appointment
                 .findByIdAndRemove(appointmentid)
                 .exec(
                     function(err, location){
                         if(err){
                           sendJsonResponse(res, 404, err);
                           return;
                         }
                         sendJsonResponse(res, 204, {"Message":"Appointment cancelled"});
                     }
                 );
         }
         else{
            sendJsonResponse(res, 404, {"message" : "appointmentid"});
         }
 }

 module.exports.appointmentByName = function(req, res){

 }

 module.exports.appointmentReadOne = function(req, res){
     
}

module.exports.appointmentUpdateOne = function(req, res){
     if(!req.params.appointmentid){
        sendJsonResponse(res, 404, {"message" : "Not found, appointmentid is required"}); 
        return; 
     }
    
}



