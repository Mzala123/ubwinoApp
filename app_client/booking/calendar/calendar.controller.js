(function () {

   angular
      .module('ubwinoApp')
      .controller('calendarCtrl', calendarCtrl);

   calendarCtrl.$inject = ['calendly','$location', 'authentication'];

   function calendarCtrl(calendly, $location, authentication) {

      var vm = this;
      vm.currentPath = $location.path();
      vm.isLoggedIn = authentication.isLoggedIn();
      vm.currentUser = authentication.currentUser();
      vm.formData={};
      vm.formData.clientName = authentication.currentUser();
      console.log(vm.formData.clientName.email);
      
      /*console.log("The email is " +vm.formData.email); 
      console.log("The name is " +vm.formData.name); */

      vm.calendarList = function () {
         calendly.getAppointmentByName(vm.formData.clientName.email, vm.formData.clientName.name)
            .then(function successCallback(response) {
               var data = response.data;
               console.log("vidata phwamwamwa", response.data);
               vm.data = { appointments: data};
               console.log("Login in values passed to api " +vm.formData.clientName.email+""
               +vm.formData.clientName.name);
            }
            ,function errorCallback(response) {
                  vm.formError = "No such data";
                  console.log(response);
             });

      }
   }

})();