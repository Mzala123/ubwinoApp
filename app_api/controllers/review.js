var mongoose = require('mongoose');
var Appointment = mongoose.model('Event')
//const { ObjectId } = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };


 module.exports.addReview = function(req, res){
     var appointmentid = req.params.appointmentid;
     var id = mongoose.Types.ObjectId(appointmentid);
     appointmentid === Appointment._id;
     if(appointmentid){
         Appointment
              .findById(appointmentid)
              .select('reviews')
              .exec(
                  function(err, appointment){
                      if(err){
                          sendJsonResponse(res, 404, err);
                      }
                      else{
                         doAddReview(req, res, appointment);
                      }
                  }
              )
     }
     else{
         sendJsonResponse(res, 404, {"message":"Not found appointment required"});
     }
 }

 var doAddReview = function(req, res){
      if(!appointment){
        sendJsonResponse(res, 404, {"message":"Appointment not found"});
      }
      else{
          appointment.reviews.push({
              rating: req.body.rating,
              reviewText: req.body.reviewText
          });
          appointment.save(function(err, location){
              var thisReview;
              if(err){
                  console.log(err);
                  sendJsonResponse(res, 400, err);
              }
              else{
                  
              }
          })
      }
 }