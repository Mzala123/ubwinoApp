(function(){
  
    angular
      .module('ubwinoApp')
      .controller('allCancelledCtrl', allCancelledCtrl);

      allCancelledCtrl.$inject = ['$location','adminAuthentication','calendly'];

      function allCancelledCtrl($location, adminAuthentication, calendly){
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = adminAuthentication.isLoggedIn();
        vm.currentUser = adminAuthentication.currentUser();
        vm.formData={};
        vm.formData.clientName = adminAuthentication.currentUser();
        console.log(vm.formData.clientName.email);

        var eventStatus = "Cancelled";
        console.log("The status is "+eventStatus);

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