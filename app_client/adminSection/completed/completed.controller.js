(function(){

    angular
      .module('ubwinoApp')
      .controller('allCompletedCtrl', allCompletedCtrl);

      allCompletedCtrl.$inject = ['$location','adminAuthentication','calendly'];

      function allCompletedCtrl($location, adminAuthentication, calendly){

        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = adminAuthentication.isLoggedIn();
        vm.currentUser = adminAuthentication.currentUser();
        vm.formData={};
        vm.formData.clientName = adminAuthentication.currentUser();
        console.log(vm.formData.clientName.email);

        var eventStatus = "Done";
        console.log("The status is "+eventStatus);

        vm.viewReview = function(id){
           console.log("The retrieved id is ahahahaha "+id);
           calendly.setIdData(id);
        }

        calendly.getAllAppointmentsByStatus(eventStatus)
            .then(function successCallback(response) {
               var data = response.data;
               console.log("vidata phwamwamwa", response.data);
               vm.message = data.length > 0 ? "" : "No cancelled appointments Found";
               vm.data = { appointments: data};
               console.log("Login in values passed to api " +vm.formData.clientName.email+""
               +vm.formData.clientName.name);
            }
            ,function errorCallback(response) {
                  vm.formError = "No such data";
                  console.log(response);
             });

      }

})();