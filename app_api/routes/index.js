var express = require("express");
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'thisSecret',
    userProperty: 'payload',
    algorithms: ['HS256']
});

var ctrlAuth = require('../controllers/authentication');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;