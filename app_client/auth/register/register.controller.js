(function () {

    angular
        .module('ubwinoApp')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', 'authentication'];
    function registerCtrl($location, authentication) {
        var vm = this;
        vm.credentials = {
            name: "",
            emai: "",
            password: ""
        };
        vm.currentPath = $location.path();
        //vm.returnPage = $location.search().page || '/login';


        vm.onSubmit = function () {
            if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
                swal({
                    title: "Registering Client Account!",
                    text: "Please fill in all fields !",
                    icon: "warning",
                    button: "OK"
                });
                return false;
            }
            else {
                console.log("Tafikamo muno tionetu");
                vm.doRegister();
            }
        }

        vm.doRegister = function(){
            authentication.register(vm.credentials)
                .then(function successCallback(response) {
                    swal({
                        title: "Registering Client Account!",
                        text: "Client Registered successfully!",
                        icon: "success",
                        button: "OK"
                    }).then(function(){
                       $location.path('/login');
                    })  
                    console.log("Registered user successfully");
                }
                , function errorCallback(err) {
                      /*  swal({
                            title: "Registering Client Account!",
                            text: "email already registered with another account!",
                            icon: "warning",
                            button: "OK"
                        });*/
                        vm.emailCheck = "";
                        vm.emailCheck = "Email already registered with another account";
                    });
        }
    }

})();