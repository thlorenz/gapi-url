'use strict'

/* global gapi */

const loadScript = require('load-script-once')
const url = 'https://apis.google.com/js/client.js'

const waitingForInit = []
var initializationInProgress = false

function waitForClient(cb) {
  if (gapi.client != null) return cb()

  function waitForClientAgain() {
    waitForClient(cb)
  }

  setTimeout(waitForClientAgain, 10)
}

function initGapi(cb) {
  waitingForInit.push(cb)

  if (initializationInProgress) return
  initializationInProgress = true

  loadScript(url, onurlLoaded)

  function onurlLoaded(err) {
    if (err) return cb(err)
    waitForClient(onclientArrived)
  }

  function onclientArrived() {
    gapi.client.load('urlshortener', 'v1', onurlShortenerLoaded)
  }
}

function onurlShortenerLoaded() {
  for (var i = 0; i < waitingForInit.length; i++) {
    const cb = waitingForInit[i]
    cb()
  }
  waitingForInit.length = 0
}

module.exports = initGapi
