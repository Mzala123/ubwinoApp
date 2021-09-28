(function(){

    angular
       .module('ubwinoApp')
       .controller('reviewModalCtrl', reviewModalCtrl);

       reviewModalCtrl.$inject = ['$location', 'authentication', 'calendly', '$scope','$rootScope'];
       function reviewModalCtrl($location, authentication, calendly,$scope, $rootScope){
        var vm = this;
        vm.currentPath = $location.path();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();
        vm.formData={};
        vm.formData.clientName = authentication.currentUser();
        console.log(vm.formData.clientName.email);
        vm.data = {};
        vm.data.desc = "";
        
        //var appointmentid;

        vm.appointmentid = calendly.getIdData();
        console.log("My received data is "+vm.appointmentid);
         
        console.log("tionetu id ", vm.appointmentid);
        calendly.getDataByAppointmentId(vm.appointmentid)
           .then(function successCallback(response) {
                var data = response.data;
                console.log("Data retrieved by id is", response.data);
                vm.data = { appointments: data}; 
                $scope.desc = response.data.eventDescription;
                $scope.id = response.data._id;
                console.log("can appointments do it ?" +$scope.desc +" "+$scope.id);           
             },
             function errorCallback(response) {
                vm.formError = "No such data";
                console.log(response);
            });

            vm.onSubmit = function () {
                vm.formError = "";
                if (!vm.formData.rating || !vm.formData.reviewText) {
                    swal({
                        title: "Adding appointment review!",
                        text: "Please fill in all fields !",
                        icon: "warning",
                        button: "OK"
                      });         
                }
                else {
                    vm.doAddReview($scope.id, vm.formData);
                }
            };

            vm.doAddReview = function(appointmentid, formData){
                calendly.addReviewById(appointmentid,{
                    //author : formData.name,
                    rating : formData.rating,
                    reviewText : formData.reviewText
                })
                .then(function successCallback(response){
                  swal({
                    title: "Adding appointment review!",
                    text: "Review submmitted successfully!",
                    icon: "success",
                    button: "OK"
                  });      
                }
                ,function errorCallback(response){
                    swal({
                        title: "Adding appointment review!",
                        text: "Review not submmitted !",
                        icon: "warning",
                        button: "OK"
                      });   
                 
              });
              return false;
            }
       
       }

})();