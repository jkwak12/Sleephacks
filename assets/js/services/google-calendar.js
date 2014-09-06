angular.module('sleephack')
  .run(function(Restangular){
    Restangular.extendCollection('calendars', function(collection) {
      return collection
    })

  })
  .factory('GoogleCalendar', function(Restangular) {
    var restAngular = Restangular.withConfig(function(Configurer) {
      Configurer.setBaseUrl('/api')
    })

    var service = restAngular.service('calendars')

    angular.extend(service, {
      getBusy: function(){
        this.getList().then(function(results){
          var allCalendars = results.filter(function(result){
            console.log(result)
            return result.id
          })
          console.log(allCalendars)
          return this.getList('busy', {calendars: allCalendars})
        }.bind(this))
      }
    })

    return service
  })
