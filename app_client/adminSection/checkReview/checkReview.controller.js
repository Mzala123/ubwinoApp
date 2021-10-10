(function(){

     angular
       .module('ubwinoApp')
       .controller('checkReviewCtrl', checkReviewCtrl);

       checkReviewCtrl.$inject = ['$location', 'adminAuthentication', 'calendly'];

       function checkReviewCtrl($location, adminAuthentication, calendly){
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = adminAuthentication.isLoggedIn();
        vm.currentUser = adminAuthentication.currentUser();
        vm.formData={};
        vm.formData.clientName = adminAuthentication.currentUser();
        console.log(vm.formData.clientName.email);

        vm.appointmentid = calendly.getIdData();
        console.log("My received for reviews  is "+vm.appointmentid);

        calendly.getReviewData(vm.appointmentid)
          .then(function successCallback(response) {
            var data = response.data;
            console.log("vidata phwamwamwa", response.data);
            vm.message = data.length > 0 ? "" : "No review for this appointments Found";
            vm.data = { appointments: data};
         }
         ,function errorCallback(response) {
               vm.formError = "No such data";
               console.log(response);
          });

       }
})();