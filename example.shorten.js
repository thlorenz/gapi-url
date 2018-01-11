'use strict'

const API_KEY = 'AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA'

const gapiUrl = require('./')
const shortenURL = gapiUrl.shortenURL
shortenURL(API_KEY, 'https://github.com', print)

function print(err, res) {
  if (err) return console.error(err)
  console.log('shortened url: ', res)
}
