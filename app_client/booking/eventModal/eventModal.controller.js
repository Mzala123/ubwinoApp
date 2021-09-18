(function () {

    angular
      .module('ubwinoApp')
      .controller('eventModalCtrl', eventModalCtrl);

      eventModalCtrl.$inject = ['$uibModalInstance'];
      function eventModalCtrl($uibModalInstance){
          var vm = this;

          vm.modal = {
            cancel : function () {
                $uibModalInstance.dismiss('cancel');
            }
        };
    }
    

})();