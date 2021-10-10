
(function () {

    angular
        .module('ubwinoApp')
        .controller('settingsCtrl', settingsCtrl);

    settingsCtrl.$inject = ['$location', 'adminAuthentication', 'authentication'];

    function settingsCtrl($location, adminAuthentication, authentication) {
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = adminAuthentication.isLoggedIn();
        vm.currentUser = adminAuthentication.currentUser();
        vm.formData = {};
        vm.formData.clientName = adminAuthentication.currentUser();
        console.log(vm.formData.clientName.email);

        vm.returnPage = $location.search().page || '/settings';

        vm.removeClient = function (id) {
            console.log('the client id is ' + id);
            swal({
                title: "Are you sure?",
                text: "Once removed, this client won't access his or her account !",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        authentication.removeClient(id)
                            .then(function successCallback(response) {
                                swal("Client Removed!", {
                                    icon: "success",
                                });
                                $location.search('page', null);
                                $location.path(vm.returnPage);

                            }
                                , function errorCallback(response) {
                                    vm.formError = "No such data";
                                    console.log(response);
                                });


                    } else {
                        swal("You cancelled client removal!");
                    }
                });


        }

        adminAuthentication.getAllClients()
            .then(function successCallback(response) {
                var data = response.data;
                console.log("ma clients ndi awa", response.data);
                vm.message = data.length > 0 ? "" : "No Clients Found";
                vm.data = { clients: data };

            }
                , function errorCallback(response) {
                    vm.formError = "No such data";
                    console.log(response);
                });

    }

})();