'use strict'

/* global XMLHttpRequest */

const GAPI_URL_API_KEY = 'AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA'
const endpoint = `https://www.googleapis.com/urlshortener/v1/url?key=${GAPI_URL_API_KEY}`
const cache = {}

/**
 * Shortens the provided url
 *
 * @param {String} link that you want to shorten.
 * @param {Function} callback with following signature `function (err, shortenedLink`
 */
function shortenURL(link, cb) {
  const cachedResponse = cache[link]

  function callbackWithCachedResponse() { cb(null, cachedResponse) }
  if (cachedResponse) return setTimeout(callbackWithCachedResponse, 0)

  const req = new XMLHttpRequest()

  req.addEventListener('error', transferFailed, false)
  req.addEventListener('load', transferComplete, false)
  req.addEventListener('abort', transferCanceled, false)
  req.open('POST', endpoint)
  req.setRequestHeader('Content-type', 'application/json')

  req.send(JSON.stringify({ longUrl: link }))

  function transferComplete() {
    if (req.status !== 200) {
      return cb(new Error('Unexpected status code ' + req.status))
    }
    var response = req.response
    if (typeof response === 'string') {
      response = JSON.parse(response)
    }

    cache[link] = response.id
    cb(null, response.id)
  }

  function transferFailed() {
    cb(new Error('Failed to shorten link due to failed transfer'))
  }

  function transferCanceled() {
    cb(new Error('Cancelled shortening of the link'))
  }
}

exports.shortenURL = shortenURL
