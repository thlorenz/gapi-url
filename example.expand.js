'use strict'

const API_KEY = 'AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA'

const gapiUrl = require('./')
const expandURL = gapiUrl.expandURL
expandURL(API_KEY, 'https://goo.gl/un5E', 'FULL', print)

function print(err, res) {
  if (err) return console.error(err)
  console.log('expanded url: ', res)
}
