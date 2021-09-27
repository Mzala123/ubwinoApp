(function(){

angular
   .module('ubwinoApp')
   .service('schedule', schedule);

   schedule.$inject = ['$http'];

   function schedule ($http){
       var createSchedule = function(scheduleData){
           return $http.post('/api/bookings',scheduleData);
       }

      var updateScheduleEvent = function(appointmentid){
          return $http.put('/api/updates?appointmentid='+appointmentid);
      }

      var cancelScheduledEvent = function(appointmentid){
        return $http.put('/api/bookings?appointmentid='+appointmentid);
    }
       
       return{
           createSchedule : createSchedule,
           updateScheduleEvent : updateScheduleEvent,
           cancelScheduledEvent : cancelScheduledEvent
  
       }
   }

})();