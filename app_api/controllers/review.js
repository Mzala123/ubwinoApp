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
     console.log("the appointment id is"+appointmentid);
     if(!appointmentid){
        sendJsonResponse(res, 404, {"message" : "Not found, appointmentid is required"}); 
        return; 
      }
         Appointment
              .findById(appointmentid)
              .select('reviews')
              .exec(
                  function(err, appointment){
                      if(err){
                          sendJsonResponse(res, 404, err);
                      }
                      else{
                        console.log(appointment);
                        //sendJsonResponse(res, 200, appointment);
                        doAddReview(req, res, appointment);   
                      }
                  }
              )
     
 }

 var doAddReview = function(req, res, appointment){
    // var appointment;
     console.log(appointment);
      if(!appointment){
        sendJsonResponse(res, 404, {"message":"Appointment not found"});
      }
      else{
          appointment.reviews.push({
              rating: req.body.rating,
              reviewText: req.body.reviewText
          });
          appointment.save(function(err, appointment){
              var thisReview;
              if(err){
                  console.log(err);
                  sendJsonResponse(res, 400, err);
              }
              else{
                updateAverageRating(appointment._id);
                thisReview = appointment.reviews[appointment.reviews.length-1];
                sendJsonResponse(res, 201, thisReview);
              }
          })
      }
 }

 var updateAverageRating = function(appointmentid){
    Appointment
       .findById(appointmentid)
       .select('rating reviews')
       .exec(
           function(err, appointment){
               if(!err){
                   doSetAverageRating(appointment);
               }
           });
       
};

var doSetAverageRating = function(appointment){
    var i, reviewCount, ratingAverage, ratingTotal;
    if(appointment.reviews && appointment.reviews.length > 0){
        reviewCount = appointment.reviews.length;
        ratingTotal = 0;
        for(i =0; i < reviewCount; i++){
            ratingTotal = ratingTotal + appointment.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        appointment.rating = ratingAverage;
        appointment.save(function(err){
        if(err){
         console.log(err);
        }
        else{
         console.log("Average rating updated to", ratingAverage);
        }
        });
    }
};

module.exports.reviewsRead =function(req, res){
      var appointmentid= req.params.appointmentid;
      if(req.params && req.params.appointmentid && req.params.reviewid){
           Appointment
              .findById(appointmentid)
              .select("name reviews")
              .exec(function(err, appointment){
                  var response, review;
                  if(!appointment){
                      sendJsonResponse(res, 404, {"message":" appointment not found"});
                      return;
                  }else if(err){
                      sendJsonResponse(res, 404, err);
                  }
                  if(appointment.reviews && appointment.reviews.length > 0){
                      review = appointment.reviews.id(req.params.reviewid);
                      if(!review){
                        sendJsonResponse(res, 404, {"message" : "review id not found"});
                      }
                      else{
                          response = {
                              appointment:{
                                  name : appointment.name,
                                  id: req.params.appointmentid
                              },
                              review : review
                          };
                          sendJsonResponse(res, 200, response);
                      }
                  }else{
                      sendJsonResponse(res, 404, {"message": "no such review found"});
                  }

              })
      }
      else{
          sendJsonResponse(res, 404, {"message" :"not found, appointmentid and reviewid are both required"});
      }
}
