var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
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
    clientName: {type: String, required: true},
    eventType : {type: String, required: true},
    eventDescription: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required:true},
    startTime: {type: Date, required:true},
    endTime: {type:Date, required: true},
    status: {type: String, "default": "scheduled"},
    reviews:[reviewSchema]
});

mongoose.model('Event', eventSchema);