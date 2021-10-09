(function(){

    angular
       .module('ubwinoApp')
       .directive('adminnavigation', adminnavigation);
    
       function adminnavigation(){
           return{
               restrict: 'EA',
               templateUrl: '/common/directive/adminNavigation/adminnavigation.template.html'
           };
       }
    
    })();