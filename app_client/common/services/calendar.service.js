(function () {
    angular
      .module('ubwinoApp')
      .service('calendly', calendly);

    calendly.$inject = ['$http'];
    function calendly($http) {
        var getAppointmentByName = function (email, name) {
            console.log("mwalandila ma values koma " +email +" "+name);
            return $http.get('/api/bookings?email='+email+ '&name='+name);
        };
        return{
            getAppointmentByName : getAppointmentByName    
        }

    }
})();