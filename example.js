'use strict'

const gapiUrl = require('./')
const shortenURL = gapiUrl.shortenURL
shortenURL('https://github.com', print)

function print(err, res) {
  if (err) return console.error(err)
  console.log('shortened url: ', res)
}
