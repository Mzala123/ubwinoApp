(function () {
    angular
      .module('ubwinoApp')
      .service('calendly', calendly);

    calendly.$inject = ['$http', '$rootScope'];
    function calendly($http, $rootScope) {
        var getAppointmentByName = function (email, name) {
            console.log("mwalandila ma values koma " +email +" "+name);
            return $http.get('/api/bookings?email='+email+ '&name='+name);
        };

        var getAppointmentsByStatus = function (email, name, eventStatus) {
            console.log("mwalandila ma values koma " +email +" "+name +" "+eventStatus);
            return $http.get('/api/events?email='+email+ '&name='+name+ '&eventStatus='+eventStatus);
        };

        this.TempData="";
        var vm = this;
        setIdData = function(appointmentid){
            this.TempData = appointmentid;
            $rootScope.$emit("appointment");           
        }

        getIdData = function(){
            return this.TempData; 
        }

        var getDataByAppointmentId = function(appointmentid){
            return $http.get('/api/bookings/'+appointmentid);
        }

        var addReviewById = function(appointmentid, data){
            return $http.post('/api/bookings/'+appointmentid+'/reviews',data);

           };

        return{
            getAppointmentByName : getAppointmentByName,
            getAppointmentsByStatus : getAppointmentsByStatus, 
            setIdData : setIdData,
            getIdData : getIdData,
            getDataByAppointmentId : getDataByAppointmentId,
            addReviewById : addReviewById
        }

    }
})();