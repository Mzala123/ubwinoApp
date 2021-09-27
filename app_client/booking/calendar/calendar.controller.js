(function () {

   angular
      .module('ubwinoApp')
      .controller('calendarCtrl', calendarCtrl);

   calendarCtrl.$inject = ['calendly','$location', 'authentication', 'schedule'];

   function calendarCtrl(calendly, $location, authentication, schedule) {

      var vm = this;
      vm.currentPath = $location.path();
      vm.isLoggedIn = authentication.isLoggedIn();
      vm.currentUser = authentication.currentUser();
      vm.formData={};
      vm.formData.clientName = authentication.currentUser();
      vm.data = {};
      
       var eventStatus = "scheduled";
      console.log(vm.formData.clientName.email);
     
         calendly.getAppointmentsByStatus(vm.formData.clientName.email, vm.formData.clientName.name, eventStatus)
            .then(function successCallback(response) {
               var data = response.data;
               console.log("vidata phwamwamwa", response.data);
               vm.message = data.length > 0 ? "" : "No Scheduled appointments Found";
               vm.data = { appointments: data};
               console.log("Login in values passed to api " +vm.formData.clientName.email+""
               +vm.formData.clientName.name);
            }
            ,function errorCallback(response) {
                  vm.formError = "No such data";
                  console.log(response);
             });

             vm.updateAppointment = function(id){
               console.log("button la update "+id);
               swal({
                  
                  title: "Are you sure?",
                  text: "Confirm if you has this event!",
                  icon: "info",
                  buttons: true,
                  //dangerMode: true,
                })
                .then(
                    schedule.updateScheduleEvent(id)
                     .then(function successCallback(response) {
                        var data = response.data;
                        console.log("vidata phwamwamwa", response.data);
                        swal("This scheduled event was conducted!", {
                           icon: "success",
                         });
                        //vm.data = { appointments: data};  
                     }
                     ,function errorCallback(response) {
                           vm.formError = "No such data";
                           console.log(response);
                      })
                );

             }

             vm.cancelAppointment = function(id){
               console.log("button la update "+id);
               swal({
                  
                  title: "Are you sure?",
                  text: "Confirm if you want to cancel appointment!",
                  icon: "warning",
                  buttons: true,
                  //dangerMode: true,
                })
                .then(
                   schedule.cancelScheduledEvent(id)
                     .then(function successCallback(response) {
                        var data = response.data;
                        console.log("vidata phwamwamwa", response.data);
                        swal("You cancelled an appointment!", {
                           icon: "success",
                         });
                        //vm.data = { appointments: data};  
                     }
                     ,function errorCallback(response) {
                           vm.formError = "No such data";
                           console.log(response);
                      })
                );
             }
      
   }

})();