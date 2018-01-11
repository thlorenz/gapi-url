# gapi-url [![build status](https://secure.travis-ci.org/thlorenz/gapi-url.svg?branch=master)](http://travis-ci.org/thlorenz/gapi-url)

Small wrapper around Google Url Shortener API providing 'insert' and 'get' methods.

```js
const gapiUrl = require('gapi-url')
gapi.shortenURL('https://github.com', print)

function print(err, res) {
  if (err) return console.error(err)
  console.log('shortened url: ', res)
}

// => shortened url:  https://goo.gl/un5E
```

## Installation

    npm install gapi-url

## [API](https://thlorenz.github.io/gapi-url)

### TODOs

- add short url expander API

## Resources

### Getting Started with the Google Shortener API

#### API documented here

```
https://developers.google.com/url-shortener/v1/url
```

[link](https://developers.google.com/url-shortener/v1/url)

#### Get API key

```
https://developers.google.com/url-shortener/v1/getting_started
```

[link](https://developers.google.com/url-shortener/v1/getting_started)

#### View Shortener Console

```
https://console.developers.google.com/apis/api/urlshortener.googleapis.com/overview?project=gapi-url-1513446857763&duration=PT1H
```

[link](https://console.developers.google.com/apis/api/urlshortener.googleapis.com/overview?project=gapi-url-1513446857763&duration=PT1H)

#### Testing with curl

```
curl https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA \
-H 'Content-Type: application/json'                                                             \
-d '{"longUrl": "http://www.google.com/" }'
```

## Kudos

Thanks to @anvaka for his initial shortener implementation.

- [implementation inside fieldplay](https://github.com/anvaka/fieldplay/blob/2904a2a518dfa7bcb1929997134aef96907c1aea/src/lib/shortener.js)

## License

MIT
