(function(){
    angular
       .module('loc8rApp')
       .service('authentication', authentication);

       authentication.$inject = ['$http', '$window'];
       function authentication($http, $window){
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

            register = function(user){
                return $http.post('/api/register', user).then(function successCallback(response){
                    var data = response.data;
                    saveToken(data.token);
                    console.log("Iwee ukulandila token ait " +data);
                })
            }
     
            login = function(user){
             return $http.post('/api/login', user).then(function successCallback(response){
                 var data = response.data;
                 saveToken(data.token);

             })
          }

            logout = function(){
              $window.localStorage.removeItem('ubwino-token');
            };

            return {
                currentUser : currentUser,
                saveToken: saveToken,
                getToken: getToken,
                isLoggedIn: isLoggedIn,
                register: register,
                login : login,
                logout : logout
            };
       }
    
       
})();