(function(){

angular
   .module('ubwinoApp')
   .service('schedule', schedule);

   schedule.$inject = ['$http'];

   function schedule ($http){
       var createSchedule = function(scheduleData){
           return $http.post('/api/bookings',scheduleData);
       }
       
       return{
           createSchedule : createSchedule
           
       }
   }

})();