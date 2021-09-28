(function(){

    angular
       .module('ubwinoApp')
       .controller('completeCtrl', completeCtrl);
      // .factory('appointmentData', appointmentData);

        completeCtrl.$inject = ['$location', 'authentication', 'calendly'];

        function completeCtrl($location, authentication, calendly){
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();
        vm.formData={};
        vm.formData.clientName = authentication.currentUser();
        console.log(vm.formData.clientName.email);
        vm.data = {};
        var eventStatus = "Done";
        console.log("The status is "+eventStatus);

        calendly.getAppointmentsByStatus(vm.formData.clientName.email, vm.formData.clientName.name, eventStatus)
            .then(function successCallback(response) {
               var data = response.data;
               console.log("vidata phwamwamwa", response.data);
               vm.message = data.length > 0 ? "" : "No concluded appointments Found";
               vm.data = { appointments: data};
               console.log("Login in values passed to api " +vm.formData.clientName.email+""
               +vm.formData.clientName.name);
            }
            ,function errorCallback(response) {
                  vm.formError = "No such data";
                  console.log(response);
             });

             vm.addReview = function(id){
               console.log("Add review to this event "+id);
               calendly.setIdData(id);
               
             }

             

        }

      

})();