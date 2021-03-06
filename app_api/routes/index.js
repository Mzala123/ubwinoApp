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
var ctrlStatus = require('../controllers/eventStatus');
var ctrlReview = require('../controllers/review');
var ctrlSchedule = require('../controllers/schedule');
var ctrlAdmin = require('../controllers/adminAuth');

//booking
router.get('/bookings', ctrlBook.appointmentByName);
router.post('/bookings', ctrlBook.appointmentCreate);
router.get('/bookings/:appointmentid', ctrlBook.appointmentReadOne);
router.get('/events/', ctrlStatus.appointmentByStatus);
router.post('/updates/:appointmentid', ctrlUpdates.updateAppointment);
router.put('/updates/', ctrlUpdates.updateAppointments);
router.put('/bookings/', ctrlBook.cancelAppointment);
router.get('/schedule', ctrlSchedule.allAppointmentsByStatus);

//Reviews
router.post('/bookings/:appointmentid/reviews',ctrlReview.addReview);
router.get('/bookings/:appointmentid/reviews/:reviewid', ctrlReview.reviewsRead);

//router.post('/reviews',ctrlReview.addReview);


// authentication
router.post('/register', ctrlAuth.register);
router.post('/verify', ctrlAuth.verifyEmail);
router.post('/login', ctrlAuth.login);
router.get('/clients', ctrlAuth.allClients);
router.delete('/clients/:clientid', ctrlAuth.removeClient);

router.put('/forgotPassword', ctrlAuth.forgotPassword);

// admin Authentication
router.post('/adminRegister', ctrlAdmin.registerAdmin);
router.post('/adminLogin', ctrlAdmin.loginAdmin);


module.exports = router;