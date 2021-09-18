(function(){

   angular
      .module('ubwinoApp')
      .controller('homeCtrl', homeCtrl);

      homeCtrl.$inject = ['$location', 'authentication'];
       function homeCtrl($location, authentication){
           var vm = this;
           /*vm.currentPath = $location.path();
           vm.isLoggedIn = authentication.isLoggedIn();
           vm.currentUser = authentication.currentUser();*/
           /*vm.logout = function(){
              // authentication.logout();
              // $location.path('/login');
           }*/
       }

})();