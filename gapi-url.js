'use strict'

/* global XMLHttpRequest */

const shortLinkCache = {}
const longLinkCache = {}

/**
 * Shortens the provided url
 *
 * @param {String} apiKey api key of your google application
 * @param {String} link that you want to shorten
 * @param {Function} cb with following signature `function (err, shortenedLink)`
 */
function shortenURL(apiKey, link, cb) {
  const endpoint = 'https://www.googleapis.com/urlshortener/v1/url?key=' + apiKey

  const cachedResponse = shortLinkCache[link]

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

    shortLinkCache[link] = response.id
    cb(null, response.id)
  }

  function transferFailed() {
    cb(new Error('Failed to shorten link due to failed transfer'))
  }

  function transferCanceled() {
    cb(new Error('Cancelled shortening of the link'))
  }
}

/**
 * Expands the provided shortened url
 *
 * #### Supported projections
 *
 * - ANALYTICS_CLICKS: Returns only click counts
 * - ANALYTICS_TOP_STRINGS: Returns only top string counts
 * - FULL: Returns the creation timestamp and all available analytics
 *
 * @param {String} apiKey api key of your google application
 * @param {String} shortened link that you want to expand
 * @param {String} projection to include more info `ANALYTICS_CLICKS| ANALYTICS_TOP_STRINGS | FULL`
 * @param {Function} cb with following signature `function (err, expanedLink)`
 */
function expandURL(apiKey, shortLink, projection, cb) {
  const projectionParam = projection == null ? '' : '&projection=' + projection
  const endpoint = 'https://www.googleapis.com/urlshortener/v1/url?key=' + apiKey
    + '&shortUrl=' + shortLink + projectionParam

  const projectionKey = projection == null ? '' : projection
  const key = shortLink + projectionKey
  const cachedResponse = longLinkCache[key]

  function callbackWithCachedResponse() { cb(null, cachedResponse) }
  if (cachedResponse) return setTimeout(callbackWithCachedResponse, 0)

  const req = new XMLHttpRequest()

  req.addEventListener('error', transferFailed, false)
  req.addEventListener('load', transferComplete, false)
  req.addEventListener('abort', transferCanceled, false)
  req.open('GET', endpoint)
  req.send()

  function transferComplete() {
    if (req.status !== 200) {
      return cb(new Error('Unexpected status code ' + req.status))
    }
    var response = req.response
    if (typeof response === 'string') {
      response = JSON.parse(response)
    }

    const result = {
        expanded: response.longUrl
      , created: response.created
      , analytics: response.analytics
    }
    longLinkCache[key] = result

    cb(null, result)
  }

  function transferFailed() {
    cb(new Error('Failed to expand link due to failed transfer'))
  }

  function transferCanceled() {
    cb(new Error('Cancelled expanding the link'))
  }
}

exports.shortenURL = shortenURL
exports.expandURL = expandURL
