(function(){
     
       angular
          .module('ubwinoApp')
          .controller('reviewDetailsCtrl', reviewDetailsCtrl);

          reviewDetailsCtrl.$inject = ['$location', 'authentication'];


          function reviewDetailsCtrl($location, authentication){
            var vm = this;
            vm.currentPath = $location.path();
            vm.isLoggedIn = authentication.isLoggedIn();
            vm.currentUser = authentication.currentUser();
            vm.formData={};
            vm.formData.clientName = authentication.currentUser();
            console.log("Nde kuvutatu hehe")

            vm.checkReviews = function(id){
                console.log("check reviews for this id " +id);
            }
            console.log("Nde kuvutatu hehe2")

          }
})();