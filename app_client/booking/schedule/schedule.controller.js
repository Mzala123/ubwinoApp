(function () {

    angular
        .module('ubwinoApp')
        .controller('scheduleCtrl', scheduleCtrl);

    scheduleCtrl.$inject = ['$location', 'schedule', 'authentication'];

    function scheduleCtrl($location, schedule, authentication) {

        var vm = this;
        var clientName;
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();

        vm.formData = {};
        vm.formData.clientName = authentication.currentUser();
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.eventDescription) {
                swal({
                    title: "Scheduling appointment!",
                    text: "Please fill in all fields !",
                    icon: "warning",
                    button: "OK"
                  });         
            }
            else {
                 vm.doCreateAppointment();
             
            }

        };

        vm.doCreateAppointment = function () {
            vm.formError = "";
            schedule.createSchedule(vm.formData)
            .then(function successCallback(){
                swal({
                    title: "Scheduling appointment!",
                    text: "Appointment Scheduled successfull",
                    icon: "success",
                    button: "Yes"
                  });
                console.log("Event Scheduled successfully");
             }
              ,function errorCallback(err){
                swal({
                    title: "Scheduling appointment",
                    text: "Failed to schedule an appoitment",
                    icon: "error",
                    button: "0k"
                  });
                 console.log(err);           
             });                 
        }
    }

})();