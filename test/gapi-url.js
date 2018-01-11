'use strict'

const test = require('tape')

const gapiUrl = require('../')
const shortenURL = gapiUrl.shortenURL

const API_KEY = 'AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA'

test('\nshortens github.com correctly', function(t) {
  shortenURL(API_KEY, 'https://github.com', check)
  shortenURL(API_KEY, 'https://github.com', check)

  t.plan(2 * 2)

  function check(err, res) {
    t.ifError(err, 'should not error')
    t.equal(res, 'https://goo.gl/un5E', 'returns the shortened url')
  }
})

test('\nshortens FMA Jazz url correctly', function(t) {
  shortenURL(API_KEY, 'http://freemusicarchive.org/genre/Jazz/', check)

  function check(err, res) {
    t.ifError(err, 'should not error')
    t.equal(res, 'https://goo.gl/EiquS', 'returns the shortened url')
    t.end()
  }
})
