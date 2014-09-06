var keys = require('../../config/keys.js')
var google = require('googleapis')
var OAuth2 = google.auth.OAuth2

var oauth2Client = new OAuth2(keys.config.google.key, keys.config.google.secret, 'http://localhost:1337/app')
google.options({ auth: oauth2Client })
var calendar = google.calendar('v3')

module.exports = {

  getOauthUrl: function (req, res) {
    var url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/calendar'
    })
    res.send(url)
  },

  getToken: function (req, res) {
    oauth2Client.getToken(req.query.code, function(err, tokens) {
      if (err) sails.log.error(err)
      oauth2Client.setCredentials(tokens)
    res.send(tokens)
    })
  },

  getCalendars: function (req, res) {
    calendar.calendarList.list({}, function(err, list) {
      if (err) sails.log.error(err)
      console.log(list)
      res.send(list.items)
    })
  },

  getBusyTimes: function(req, res) {
    calendar.freebusy.query({'timeMin': '2014-08-06T10:00:00-07:00', 'timeMax': '2014-08-12T10:00:00-07:00'}, function(err, list) {
      if (err) sails.log.error(err)
      console.log(list)
      //res.send(list.items)
      res.send(list)
    })
  }



}
