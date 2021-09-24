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
        //vm.currentPath = $location.path();
        vm.returnPage = $location.search().page || '/login';


        vm.onSubmit = function () {
            //vm.formError = "" ;
            if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
                swal({
                    title: "Registering Client Account!",
                    text: "Please fill in all fields !",
                    icon: "warning",
                    button: "OK"
                });
                //vm.formError = "All fields required, please try again";
                return false;
            }
            else {
                console.log("Tafikamo muno tionetu");
                vm.doRegister();
            }
        }

        vm.doRegister = function(){
            authentication.register(vm.credentials)
                .then(function successCallback() {
                    //Alert("Client Registered Successfully");
                    swal({
                        title: "Registering Client Account!",
                        text: "Client Registered successfully!",
                        icon: "success",
                        button: "OK"
                    });
                    /// $location.search('page', null);
                    $location.path('/login');
                    console.log("Registered user successfully");
                }
                    , function errorCallback(err) {
                        vm.emailCheck = "";
                        vm.emailCheck = "Email might already be registered with another account";
                    });
        }
    }

})();