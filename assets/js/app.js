angular.module('sleephack', [
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider, $locationProvider,  $httpProvider) { //, RestangularProvider
    $locationProvider.html5Mode(true)

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    $routeProvider
      .when('/', {
        templateUrl: '',
        controller: 'IndexController as ctrl'
      })


    //RestangularProvider.setBaseUrl()

  })