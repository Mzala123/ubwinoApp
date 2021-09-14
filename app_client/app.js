(function () {

    angular.module('ubwinoApp', ['ngRoute']);

    function config ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller:  'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
             })
             .when('/login',{
               templateUrl: '/auth/login/login.view.html',
               controller: 'loginCtrl',
               controllerAs: 'vm'
             })
            .otherwise({ redirectTo: '/' });
          //$locationProvider.html5Mode(true);
            $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
            });
    }

    angular
       .module('ubwinoApp')
       .config(['$routeProvider', '$locationProvider', config])


})();