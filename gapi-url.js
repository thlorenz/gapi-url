'use strict'

const initGapi = require('./lib/init-gapi')
const GAPI_URL_API_KEY = 'AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA'

/* global gapi */
function shortenURL(longUrl, cb) {
  function doshorten() {
    gapi.client.setApiKey(GAPI_URL_API_KEY)
    gapi.client.load('urlshortener', 'v1', ongapiClientLoaded)

    function ongapiClientLoaded() {
      gapi.client.urlshortener.url
        .insert({ resource: { longUrl } })
        .execute(onurlResponse)
    }

    function onurlResponse(res) {
      if (res.error) return cb(res.error)
      cb(null, res.id)
    }
  }

  if (typeof gapi === 'undefined' || gapi.client == null) {
    initGapi(doshorten)
  } else {
    doshorten()
  }
}

exports.shortenURL = shortenURL
