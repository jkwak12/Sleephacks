angular.module('sleephack')
  .run(function(Restangular){
    Restangular.extendCollection('calendars', function(collection) {
      return collection
    })

  })
  .factory('GoogleCalendar', function(Restangular, $q) {
    var restAngular = Restangular.withConfig(function(Configurer) {
      Configurer.setBaseUrl('/api')
    })

    var service = restAngular.service('calendars')

    angular.extend(service, {
      getBusy: function(){
        return this.getList().then(function(results){
          var allCalendars = results.map(function(result){
            if (result.id) return {id: result.id}
          })

          return restAngular.one('calendars').customGETLIST('busy', {calendars: allCalendars})

          /*
          return $q.all(
            _.map(allCalendars, function(id) {
              return restAngular.one('calendars').customGETLIST('busy', {calendarId: id.id})
            }.bind(this)))
          */
          
        }.bind(this))
      }
    })

    return service
  })
