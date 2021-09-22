(function(){

angular
   .module('ubwinoApp')
   .service('schedule', schedule);

   schedule.$inject = ['$http'];

   function schedule ($http){
       var createSchedule = function(scheduleData){
           return $http.post('/api/bookings',scheduleData).then(function successCallback(response){
            var data = response.data;
            console.log("Kodi data ya schedule sikupeani", +data);
        },function errorCallback(err){
             console.log(err);       
            });
       }

      
       return{
           createSchedule : createSchedule
           
       }
   }

})();