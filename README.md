# gapi-url [![build status](https://secure.travis-ci.org/thlorenz/gapi-url.svg?branch=master)](http://travis-ci.org/thlorenz/gapi-url)

Small wrapper around Google Url Shortener API providing 'insert' and 'get' methods.

## Status

Basic shortener API implementation with _sanity check_ tests.

**We wil continue on Wed Dec 20th 6-7pm EST** on [twitch](twitch.tv/thlorenz) 📺

### TODOs

- ensure client.js doesnt get added to scripts twice (ideally with a test)
- clean up `setTimeout` (don't bind, pass `this` context)
- add more tests and run them on terminal
- add short url expander API 

## Getting Started with the Google Shortener API

### API documented here

   https://developers.google.com/url-shortener/v1/url

[link](https://developers.google.com/url-shortener/v1/url)

### Get API key

   https://developers.google.com/url-shortener/v1/getting_started

[link](https://developers.google.com/url-shortener/v1/getting_started)

### View Shortener Console

    https://console.developers.google.com/apis/api/urlshortener.googleapis.com/overview?project=gapi-url-1513446857763&duration=PT1H

[link](https://console.developers.google.com/apis/api/urlshortener.googleapis.com/overview?project=gapi-url-1513446857763&duration=PT1H)

Problem: can't find where to see which short URLs where created for an app.

### Testing with curl

```
curl https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA \
-H 'Content-Type: application/json'                                                             \
-d '{"longUrl": "http://www.google.com/" }'
```

## Installation

    npm install gapi-url

## [API](https://thlorenz.github.io/gapi-url)


## Kudos

Found initial client side usage in a cool [jsfiddle](http://jsfiddle.net/pPHKe/2/)

## License

MIT
