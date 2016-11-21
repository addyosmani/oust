# oust [![Build Status](https://travis-ci.org/addyosmani/oust.svg?branch=master)](https://travis-ci.org/addyosmani/oust)

> Extract URLs to stylesheets, scripts, links, images or HTML imports from HTML


## Install

```sh
$ npm install --save-dev oust
```


## Usage

First include:

```js
var oust = require('oust');
```

Resource links can then be extracted from either files:

#### Extract stylesheets references `<link rel="stylesheet">`

```js
var hrefs = oust(htmlString, 'stylesheets');
```

#### Extract stylesheets references with media print `<link rel="stylesheet" media="print">`

```js
var hrefs = oust(htmlString, 'stylesheets', function(i, $el) {
    return $el.attr('media') === 'print';
});
```

#### Extract script references `<script src>`

```js
var srcs = oust(htmlString, 'scripts');
```

#### Extract HTML imports `<link rel="import">`

```js
var hrefs = oust(htmlString, 'imports');
```

#### Extract URL references `<a href>`

```js
var srcs = oust(htmlString, 'links');
```

#### Extract image source references `<img src>`

```js
var srcs = oust(htmlString, 'images');
```

#### Extract cheerio elements alongside the value
Usefull for post processing/filtering as you get an array of matched elements 
with cheerio convenience syntax (e.g. `$el.attr()`)

```js
var srcs = oust.raw(htmlString, '...');

 -> [
    {value: '...', $el: '...'},
    {value: '...', $el: '...'},
    ...
 ]
```


## API

#### Options

Attribute       | Default   | Description
---             | ---       | ---
`src`           | ``        | a valid HTML string to parse for references
`type`          | ``        | one of `stylesheets`, `scripts`, `imports`, `links`, `images`

## CLI

```sh
$ npm install --global oust
```

```sh
Extract URLs to stylesheets, scripts, links, images or HTML imports from HTML

Usage:
    $ oust <filename> <type>
```

#### Extract stylesheets references `<link rel="stylesheet">`

```sh
$ oust myFile.html stylesheets
```

#### Extract script references `<script src>`

```sh
$ oust myFile.html scripts
```

#### Extract HTML imports `<link rel="import">`

```sh
$ oust myFile.html imports
```

#### Extract URL references `<a href>`

```sh
$ oust myFile.html links
```

#### Extract image source references `<img src>`

```sh
$ oust myFile.html images
```


## License

Released under an Apache 2 license. © Google 2014.
