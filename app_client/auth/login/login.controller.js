(function(){

    angular
      .module('ubwinoApp')
      .controller('loginCtrl', loginCtrl);

      loginCtrl.$inject = ['$location', 'authentication'];
      function loginCtrl($location, authentication){
           var vm = this;

           vm.credentials = {
               email : "",
               password: ""
           };
           vm.returnPage = $location.search().page || '/booking';

           vm.onSubmit = function(){
               vm.formError = "";
               if(!vm.credentials.email || !vm.credentials.password){
                   vm.formError = "All fields required, please try again";
                   return false;
               }
               else{                
                   vm.doLogin(); 
               }
           };
           vm.doLogin = function(){      
            vm.formError = "";   
            authentication
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