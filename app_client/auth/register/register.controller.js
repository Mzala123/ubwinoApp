(function(){
    
    angular
       .module('ubwinoApp')
       .controller('registerCtrl', registerCtrl);

       function registerCtrl(){
           var vm = this;

           vm.credentials = {
               name: "",
               emai : "",
               password: ""
           };
           
           vm.onSubmit = function(){
               vm.formError = "";
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
            }
             ,function errorCallback(err){
               vm.formError= err;           
            });       
        }
       }

})();