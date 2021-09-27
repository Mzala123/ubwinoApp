(function () {

    angular.module('ubwinoApp', ['ngRoute','ngSanitize','ui.bootstrap']);

    function config ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller:  'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/about', {
              templateUrl: '/about/about.view.html'
              /*controller: 'registerCtrl',
              controllerAs: 'vm' */
           })
           .when('/services', {
            templateUrl: '/services/services.view.html'
            /*controller: 'registerCtrl',
            controllerAs: 'vm' */
         })
            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
             })
             .when('/register/:email', {
              templateUrl: '/auth/register/register.view.html',
              controller: 'registerCtrl',
              controllerAs: 'vm'
            })
             .when('/login',{
               templateUrl: '/auth/login/login.view.html',
               controller: 'loginCtrl',
               controllerAs: 'vm'
             })
             .when('/booking',{
              templateUrl: '/booking/booking.view.html',
              controller: 'bookCtrl',
              controllerAs: 'vm'
            })
            .when('/calendar',{
              templateUrl: '/booking/calendar/calendar.view.html',
              controller: 'calendarCtrl',
              controllerAs: 'vm'
            })
            .when('/schedule',{
              templateUrl: '/booking/schedule/schedule.view.html',
              controller: 'scheduleCtrl',
              controllerAs: 'vm'
            })
            .when('/cancelled',{
              templateUrl: '/booking/cancelled/cancelled.view.html',
              controller: 'cancelCtrl',
              controllerAs: 'vm'
            })
            .when('/concluded',{
              templateUrl: '/booking/completed/completed.view.html',
              controller: 'completeCtrl',
              controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/' });
            $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
            });
    }

    angular
       .module('ubwinoApp')
       .config(['$routeProvider', '$locationProvider', config])


})();