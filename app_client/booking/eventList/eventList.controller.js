(function(){

    angular
       .module('ubwinoApp')
       .controller('eventListCtrl', eventListCtrl);

       eventListCtrl.$inject = ['$location','authentication'];

       function eventListCtrl($location, authentication){
        var vm = this;
        var clientName;
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();

        
       }

})();