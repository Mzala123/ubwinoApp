(function(){

  angular
     .module('ubwinoApp')
     .factory('swal', sweetAlert)

     function sweetAlert(){
        // return window.swal;
         return Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
     }

})();