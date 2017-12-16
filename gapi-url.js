'use strict'

/*
 *  ## Found Client Only Usage jsfiddle  Example via stackoverflow
 *
 *    http://jsfiddle.net/pPHKe/2/
 *    Using google's client library: https://apis.google.com/js/client.js
 *    Newer version is: https://apis.google.com/js/api.js
 */

const GAPI_URL_API_KEY = 'AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA'

/* global gapi */
function shortenURL(longUrl, cb) {
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
