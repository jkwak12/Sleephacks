angular.module('sleephack')
  .factory('GoogleOath', function(Restangular) {
    var restAngular = Restangular.withConfig(function(Configurer) {
      Configurer.setBaseUrl('/api')
    })

    var service = restAngular.service('oauth')

    angular.extend(service, {
      
    })

    return service
  })


