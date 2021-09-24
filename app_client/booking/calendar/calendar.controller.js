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
      vm.data = {};
      

      console.log(vm.formData.clientName.email);
     
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

             vm.updateAppointment = function(id){
               console.log("button la update "+id);
               swal({
                  
                  title: "Are you sure?",
                  text: "Once deleted, you will not be able to recover this imaginary file!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                })
                .then((willDelete) => {
                  if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                      icon: "success",
                    });
                  } else {
                    swal("Your imaginary file is safe!");
                  }
                });

             }

             vm.cancelAppointment = function(id){
              console.log("koma khaya "+id);
             }
      
   }

})();