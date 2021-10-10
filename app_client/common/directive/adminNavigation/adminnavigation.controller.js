(function(){
    angular
       .module('ubwinoApp')
       .controller('adminnavigationCtrl', adminnavigationCtrl);

       adminnavigationCtrl.$inject = ['$location', 'adminAuthentication'];

       function adminnavigationCtrl($location, adminAuthentication){
           var vm = this;
           vm.currentPath = $location.path();
           vm.isLoggedIn = adminAuthentication.isLoggedIn();
           vm.currentUser = adminAuthentication.currentUser();

           vm.logout = function(){
            adminAuthentication.logout();
               $location.path('/admin');
           }
       }
})();