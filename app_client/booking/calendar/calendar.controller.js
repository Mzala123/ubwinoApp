(function () {

   angular
       .module('ubwinoApp')
       .controller('calendarCtrl', calendarCtrl);

   scheduleCtrl.$inject = ['$location', 'authentication'];

   function calendarCtrl($location, authentication) {

       var vm = this;
       var clientName;
       vm.currentPath = $location.path();
       vm.isLoggedIn = authentication.isLoggedIn();
       vm.currentUser = authentication.currentUser();

       
   }

})();