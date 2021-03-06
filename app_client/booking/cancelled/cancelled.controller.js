(function(){

    angular
       .module('ubwinoApp')
       .controller('cancelCtrl', cancelCtrl);

        cancelCtrl.$inject = ['$location', 'authentication', 'calendly'];

        function cancelCtrl($location, authentication, calendly){
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();
        vm.formData={};
        vm.formData.clientName = authentication.currentUser();
        console.log(vm.formData.clientName.email);

        var eventStatus = "Cancelled";
        console.log("The status is "+eventStatus);

        calendly.getAppointmentsByStatus(vm.formData.clientName.email, vm.formData.clientName.name, eventStatus)
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