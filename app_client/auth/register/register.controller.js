(function(){
    
    angular
       .module('ubwinoApp')
       .controller('registerCtrl', registerCtrl);
        
       registerCtrl.$inject = ['$location','authentication'];
       function registerCtrl($location, authentication){
           var vm = this;
           vm.credentials = {
               name : "",
               emai : "",
               password : ""
           };
           vm.returnPage = $location.search().page || '/login';
           vm.onSubmit = function(){
               vm.formError = "" ;
               if(!vm.credentials.name || !vm.credentials.email || !vm.credentials.password){
                vm.formError = "All fields required, please try again";
                return false;
               }
               else{
                console.log("Tafikamo muno tionetu");
                vm.doRegister();
            }
           }

           vm.doRegister = function(){
            
            vm.formError = "";
            
            authentication
              .register(vm.credentials)
              .then(function successCallback(){
               $location.search('page', null);
               $location.path(vm.returnPage);
               console.log("Registered user successfully");
            }
             ,function errorCallback(err){
               vm.formError= err;           
            });       
        }
       }

})();