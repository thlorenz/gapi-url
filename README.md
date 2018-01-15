# gapi-url [![build status](https://secure.travis-ci.org/thlorenz/gapi-url.svg?branch=master)](http://travis-ci.org/thlorenz/gapi-url)

Small wrapper around Google Url Shortener API providing 'insert' and 'get' methods.

```js
const gapiUrl = require('gapi-url')

const API_KEY = '<your api key here>'

// Shorten a URL
shortenURL(API_KEY, 'https://github.com', print)

function printShortened(err, res) {
  if (err) return console.error(err)
  console.log('shortened url: ', res)
  // => shortened url:  https://goo.gl/un5E
}

// Expand a shortened URL
expandURL(API_KEY, 'https://goo.gl/un5E', 'FULL', print)

function print(err, res) {
  if (err) return console.error(err)
  console.log('expanded url: ', res)
  // => expanded url: https://github.com
}
```

## Installation

    npm install gapi-url

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [API](#api)
  - [shortenURL](#shortenurl)
  - [expandURL](#expandurl)
      - [Supported projections](#supported-projections)
  - [getAnalyticsURL](#getanalyticsurl)
    - [Example](#example)
- [Resources](#resources)
  - [Getting Started with the Google Shortener API](#getting-started-with-the-google-shortener-api)
    - [API documented here](#api-documented-here)
    - [Get API key](#get-api-key)
    - [View Shortener Console](#view-shortener-console)
    - [Testing with curl](#testing-with-curl)
- [Kudos](#kudos)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## [API](https://thlorenz.github.io/gapi-url)

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### shortenURL

Shortens the provided url

**Parameters**

-   `apiKey` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** api key of your google application
-   `link` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** that you want to shorten
-   `cb` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** with following signature `function (err, shortenedLink)`

### expandURL

Expands the provided shortened url

##### Supported projections

-   ANALYTICS_CLICKS: Returns only click counts
-   ANALYTICS_TOP_STRINGS: Returns only top string counts
-   FULL: Returns the creation timestamp and all available analytics

**Parameters**

-   `apiKey` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** api key of your google application
-   `shortened` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** link that you want to expand
-   `projection` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** to include more info `ANALYTICS_CLICKS| ANALYTICS_TOP_STRINGS | FULL`
-   `cb` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** with following signature `function (err, expanedLink)`
-   `shortLink`  

### getAnalyticsURL

Returns the url for the google analytics page for the given
shortened url.

#### Example

`getAnalyticsURL('https://goo.gl/un5E')`

=> <https://goo.gl/#analytics/goo.gl/un5E/all_time>

**Parameters**

-   `url` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** shortened URL, i.e. obtained via shortenURL

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** link to the Google Analytics page.

## Resources

### Getting Started with the Google Shortener API

#### API documented here

    https://developers.google.com/url-shortener/v1/url

[link](https://developers.google.com/url-shortener/v1/url)

#### Get API key

    https://developers.google.com/url-shortener/v1/getting_started

[link](https://developers.google.com/url-shortener/v1/getting_started)

#### View Shortener Console

    https://console.developers.google.com/apis/api/urlshortener.googleapis.com/overview?project=gapi-url-1513446857763&duration=PT1H

[link](https://console.developers.google.com/apis/api/urlshortener.googleapis.com/overview?project=gapi-url-1513446857763&duration=PT1H)

#### Testing with curl

    curl https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyA2LZbzpowavq0euPXmNhrSW6Q-R4-HnZA \
    -H 'Content-Type: application/json'                                                             \
    -d '{"longUrl": "http://www.google.com/" }'

## Kudos

Thanks to @anvaka for his initial shortener implementation.

-   [implementation inside fieldplay](https://github.com/anvaka/fieldplay/blob/2904a2a518dfa7bcb1929997134aef96907c1aea/src/lib/shortener.js)

## License

MIT
