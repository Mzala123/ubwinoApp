var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: {type: String, required: true},
    createdOn: {type: Date, "default": Date.now}
});

var transactionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    amount: {type: Number},
    createdOn: {type: Date, "default":Date.now}
});

var eventSchema = new mongoose.Schema({
    clientName: {type: Array, required: true},
    eventType : {type: String, required: true},
    eventDescription: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required:true},
    startTime: {type: String, required:true},
    endTime: {type: String, required: true},
    eventStatus: {type: String, "default": "scheduled"},
    reviews:[reviewSchema]
});

mongoose.model('Event', eventSchema);