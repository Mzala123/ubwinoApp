var express = require("express");
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'thisSecret',
    userProperty: 'payload',
    algorithms: ['HS256']
});

var ctrlAuth = require('../controllers/authentication');

var ctrlBook = require('../controllers/booking');
var ctrlUpdates = require('../controllers/update');

//booking
router.get('/bookings', ctrlBook.appointmentByName);
router.post('/bookings', ctrlBook.appointmentCreate);
router.get('/bookings/:appointmentid', ctrlBook.appointmentReadOne);
router.post('/updates/:appointmentid', ctrlUpdates.updateAppointment);
router.put('/updates/', ctrlUpdates.updateAppointments);
router.delete('/bookings/:appointmentid', ctrlBook.appointmentDeleteOne);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/verify', ctrlAuth.verifyEmail);
router.post('/login', ctrlAuth.login);

module.exports = router;