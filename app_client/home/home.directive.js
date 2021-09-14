(function(){

    angular
       .module('ubwinoApp')
       .directive('navigation', home);
    
       function home(){
           return{
               restrict: 'EA',
               templateUrl: '/home/home.directive.html'
           };
       }
    
    })();