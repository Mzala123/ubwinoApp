var mongoose = require('mongoose');
var dbURL = 'mongodb+srv://Mzala:bounce123@mzalacluster.qqifv.mongodb.net/ubwinoApp';
var readLine = require('readline');

var gracefulShutdown;
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURL);
mongoose.connection.on('connection', function(){
   console.log('mongoose connected to ' +dbURL);
});



mongoose.connection.on('error', function(){
    console.log('mongoose connection error ' +err);
 });

 mongoose.connection.on('disconnected', function(){
    console.log('mongoose disconnected');
 });

 gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected through "+msg);
        callback();
    });
};

process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon restart', function(){
    process.kill(process.pid, 'SIGUSR2');
    });
});


process.on('SIGINT', function(){
    gracefulShutdown('app termination', function(){
    process.exit(0);
    });
});

process.on('SIGINT', function(){
    gracefulShutdown('Heroku app shutdown', function(){
    process.exit(0);
    });
});

require('./events');
require('./users');
require('./admin');