(function(){

    angular
       .module('ubwinoApp')
       .controller('bookCtrl', bookCtrl);
 
       bookCtrl.$inject = ['$location', 'authentication'];
        function bookCtrl($location, authentication){
            var vm = this;
            vm.eventType = "Photography";
            vm.eventType1 = "Videography";

            vm.currentPath = $location.path();
            vm.isLoggedIn = authentication.isLoggedIn();
            vm.currentUser = authentication.currentUser();
 
            vm.logout = function(){
                authentication.logout();
                $location.path('/login');
            }
        }
 
 })();