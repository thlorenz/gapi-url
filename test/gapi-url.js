'use strict'

const test = require('tape')

const gapiUrl = require('../')
const shortenURL = gapiUrl.shortenURL
const expandURL = gapiUrl.expandURL

const API_KEY = 'AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA'
const fmurl = 'http://freemusicarchive.org/genre/Jazz/'
const fmshortUrl = 'https://goo.gl/EiquS'

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
  shortenURL(API_KEY, fmurl, check)

  function check(err, res) {
    t.ifError(err, 'should not error')
    t.equal(res, fmshortUrl, 'returns the shortened url')
    t.end()
  }
})

test('\nexpands shortened FMA Jazz url correctly, no projection', function(t) {
  expandURL(API_KEY, fmshortUrl, null, checkNoProjection)

  function checkNoProjection(err, res) {
    t.ifError(err, 'should not error')
    t.equal(res.expanded, fmurl, 'includes expanded url')
    t.equal(typeof res.analytics, 'undefined', 'does not include analytics')
    t.equal(typeof res.created, 'undefined', 'does not include created')
    t.end()
  }
})

test('\nround tripping Martin Luther King JR. wiki url ', function(t) {
  const longUrl = 'https://en.wikipedia.org/wiki/Martin_Luther_King_Jr.'

  shortenURL(API_KEY, longUrl, onshortened)
  function onshortened(err, res) {
    t.ifError(err, 'shorten should not error')
    expandURL(API_KEY, res, null, onexpanded)
  }

  function onexpanded(err, res) {
    t.ifError(err, 'expand should not error')
    t.equal(res.expanded, longUrl, 'includes originally shortened url')
    t.end()
  }
})
