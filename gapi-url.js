'use strict'

const loadScript = require('load-script')

/*
 *  ## Found Client Only Usage jsfiddle  Example via stackoverflow
 *
 *    http://jsfiddle.net/pPHKe/2/
 *    Using google's client library: https://apis.google.com/js/client.js
 *    Newer version is: https://apis.google.com/js/api.js
 */

const GAPI_URL_API_KEY = 'AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA'
const url = 'https://apis.google.com/js/client.js'

function waitForClient(cb) {
  if (gapi.client != null) cb()
  setTimeout(waitForClient.bind(null, cb), 10)
}

function initGapi(cb) {
  loadScript(url, onurlLoaded)

  function onurlLoaded(err, script) {
    if (err) return console.error(err)
    waitForClient(onclientArrived)
  }

  function onclientArrived() {
    gapi.client.load('urlshortener', 'v1', cb)
  }
}

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
