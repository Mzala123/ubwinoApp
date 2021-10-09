(function () {


  angular
    .module('ubwinoApp')
    .controller('adminCtrl', adminCtrl);

  adminCtrl.$inject = ['$location', 'adminAuthentication'];
  function adminCtrl($location, adminAuthentication) {
    var vm = this;
    vm.credentials = {
      email: "",
      password: ""
    };

    vm.returnPage = $location.search().page || '/cancel';
    vm.onSubmit = function(){
      $location.path(vm.returnPage);
      //vm.formError = "";
     /* if(!vm.credentials.email || !vm.credentials.password){
          vm.formError = "All fields required, please try again";
          return false;
      }
      else{                
         
      }*/
  };


  }

})();