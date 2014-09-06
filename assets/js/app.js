angular.module('sleephack', [
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider, $locationProvider,  $httpProvider) { //, RestangularProvider
    $locationProvider.html5Mode(true)

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    $routeProvider
      .when('/', {
        templateUrl: '/templates/index.html',
        controller: 'IndexController as ctrl',
        reloadOnSearch: false
      })
      .when('/app', {
        templateUrl: '/templates/index.html',
        controller: 'AppController as ctrl',
        reloadOnSearch: false
      })

  })