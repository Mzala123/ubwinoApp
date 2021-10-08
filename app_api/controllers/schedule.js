var mongoose = require('mongoose');
var Appointment = mongoose.model('Event');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };

module.exports.allAppointmentsByStatus = function(req, res){
    sendJsonResponse(res, 404, {"message":"hello world"});
}