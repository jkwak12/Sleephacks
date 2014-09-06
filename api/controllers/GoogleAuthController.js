var keys = require('../../config/keys.js')
var request = require('request')
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
      res.send(list.items)
    })
  },

  getBusyTimes: function(req, res) {

    var otherAuth = {
      token: oauth2Client.credentials.access_token,
      consumer_key: keys.config.google.key,
      consumer_secret: keys.config.google.secret
    }

    
    
    var options = {
      url: 'https://www.googleapis.com/calendar/v3/freeBusy',
      method: "POST",
      json: '{timeMin: \"2014-08-06T04:47:09Z\", timeMax: \"2014-08-12T04:47:09Z\", items: ['+ req.query.calendars + ']}',
      qs: {key: keys.config.google.key},
      oauth: oauth2Client,
      'X-JavaScript-User-Agent': 'google-api-javascript-client/1.0.0-alpha'
    }

    console.log('{timeMin: \"2014-08-06T04:47:09Z\", timeMax: \"2014-08-12T04:47:09Z\", items: ['+ req.query.calendars + ']}')

    request(options, function(err, response, body) {
      res.send(body)
    })

    

    /*
    
    var options = {
      url: 'https://www.googleapis.com/calendar/v3/calendars/' + req.query.calendarId + '/events',
      qs: {key: keys.config.google.key},
      method: 'GET',
      oauth: oauth2Client,
      'X-JavaScript-User-Agent': 'google-api-javascript-client/1.0.0-alpha'
    }

    request(options, function(err, response, body) {
      res.send(body)
    })

*/



    

    // req.query = {timeMin: '2014-08-06T04:47:09Z', timeMax: '2014-08-12T04:47:09Z', index: req.query.calendars}
    // console.log(req.query)
    // var specialCal = google.calendar({ version: 'v3', auth: oauth2Client, body: '{timeMin: 2014-08-06T04:47:09Z, timeMax: 2014-08-12T04:47:09Z}' })
    // specialCal.freebusy.query({timeMin: '2014-08-06T04:47:09Z', timeMax: '2014-08-12T04:47:09Z', items: req.query.calendars}, function(err, list) {
    //   if (err) sails.log.error(err)
    //   console.log(list)
    //   //res.send(list.items)
    //   res.send(list)
    // })
  }



}
