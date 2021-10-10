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

    vm.returnPage = $location.search().page || '/settings';
    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      }
      else {
          vm.doLogin();
      }
    };

    vm.doLogin = function(){      
      vm.formError = "";   
      adminAuthentication
        .login(vm.credentials)
        .then(function successCallback(response){  
          $location.search('page', null);
          $location.path(vm.returnPage);
          console.log("Logged In successfully");
      }
       ,function errorCallback(err){
         vm.formError= "Incorrect Credentials";           
      });       
  }


  }

})();