(function(){

     angular
       .module('ubwinoApp')
       .service('adminAuthentication', adminAuthentication);
       
       adminAuthentication.$inject = ['$http', '$window'];
       function adminAuthentication($http, $window){

          var saveToken = function(token){
            $window.localStorage['ubwino-token'] = token;
           };

           var getToken = function(){
               return $window.localStorage['ubwino-token'];
           }

           var isLoggedIn = function(){
            var token = getToken();
            if(token){
             var payload = JSON.parse($window.atob(token.split('.')[1]));
             return payload.exp > Date.now()/1000;
            }
            else{
            return false;
            }
           }

           var currentUser = function(){
               if(isLoggedIn()){
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return{
                    email : payload.email,
                    name : payload.name
                }
               }
           }

           login = function(admin){
            return $http.post('/api/adminLogin', admin).then(function successCallback(response){
                var data = response.data;
                saveToken(data.token);
            })
         }

           logout = function(){
             $window.localStorage.removeItem('ubwino-token');
           };
          
           var getAllClients = function(){
            return $http.get('/api/clients');
        }

           
           return {
            currentUser : currentUser,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            login : login,
            logout : logout,
            getAllClients : getAllClients
           
        };
       }

})();