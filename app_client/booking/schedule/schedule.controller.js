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
       //vm.formData.clientName = authentication.currentUser();
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.formData.eventDescription) {
                vm.formError = "Please fill in all fields";
                          
            }
            else {
                 console.log("ClientName is " +vm.formData.clientName);
                 console.log("The appointment data is " +vm.formData);
                 vm.doCreateAppointment();
            }

        };

        vm.doCreateAppointment = function () {
            vm.formError = "";
            schedule.createSchedule(vm.formData)
            .then(function successCallback(){
               /*$location.search('page', null);
                $location.path(vm.returnPage);*/
                console.log("Event Scheduled successfully");
             }
              ,function errorCallback(err){
                vm.formError= err;           
             });                 
        }
    }

})();