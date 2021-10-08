(function (){

    angular
       .module('ubwinoApp')
       .directive('ratingStars', ratingStars);

       function ratingStars(){
           return{
               restrict: 'EA',
               scope: {
                   thiRating : '=rating'
               },
               templateUrl : 'common/directive/ratingStars/ratingStars.template.html'
           };
       };

})();