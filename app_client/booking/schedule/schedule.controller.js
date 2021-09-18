(function(){

    angular
       .module('ubwinoApp')
       .controller('scheduleCtrl', scheduleCtrl);

       scheduleCtrl.$inject = ['$location','$uibModal','authentication'];

       function scheduleCtrl($location, $uibModal, authentication){
        
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();

        vm.popupEventForm = function(){
           var instanceModal = $uibModal.open({
                size:'lg',
                templateUrl: '/eventModal/eventModal.view.html',
                controller: 'eventModalCtrl as vm',
            });
           
        // alert("Lets add an event");
        }
       
       }

})()