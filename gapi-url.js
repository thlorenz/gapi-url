'use strict'

const loadScript = require('load-script')

const GAPI_URL_API_KEY = 'AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA'
const url = 'https://apis.google.com/js/client.js'

function isclientScriptLoaded(url) {
  const scripts = document.head.getElementsByTagName('script')
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src === url) return true
  }
  return false
}

function waitForClient(cb) {
  if (gapi.client != null) return cb()
  setTimeout(waitForClient.bind(null, cb), 10)
}

function initGapi(cb) {
  if (!isclientScriptLoaded(url)) {
    loadScript(url, onurlLoaded)
  } else {
    onurlLoaded(null)
  }

  function onurlLoaded(err) {
    if (err) return cb(err)
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

exports.shortenURL = shortenURL
