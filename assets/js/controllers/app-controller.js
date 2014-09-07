angular.module('sleephack')
  .controller('AppController', function(GoogleCalendar, GoogleOath, $window, $routeParams, $location) {

    this.params = $routeParams

  	this.getSchedule = function() {
  		// GoogleCalendar.one('users').one('me').one('calendarList').get().then(function(results){
    //     console.log(results)
    //   })

      if (this.params.code) {
        GoogleOath.one('token').get({code: this.params.code}).then(function(results){
          $location.url($location.path())
          // GoogleCalendar.getBusy().then(function(results){
          //   console.log(results)
          // })
        }.bind(this))
      }
      else this.getOauth()

  	}

    this.getOauth = function() {
      GoogleOath.one('initial').get().then(function(results){
        $window.location.href = results
      })
    }

  	this.getSchedule()


  })
