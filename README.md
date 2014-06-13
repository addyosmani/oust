oust [![Build Status](https://travis-ci.org/addyosmani/oust.svg?branch=master)](https://travis-ci.org/addyosmani/oust)
====

> Extract a list of stylesheets, scripts or HTML imports from HTML

### Install

```sh
npm install oust --save-dev
```

### Usage

First include:

```js
var oust = require('oust');
```

Resource links can then be extracted from either files:

#### Extract stylesheets references `<link rel="stylesheet">`

```js
oust({ src: 'test/sample/index.html' } , function ( hrefs ){
	console.log( hrefs );
});
```

#### Extract script references `<script src>`

```js
oust({ 
	src: 'test/sample/index.html', 
	selector: 'script', 
	attribute: 'src'
	}, function ( srcs ){
		console.log( srcs );
	});
```

#### Extract HTML imports `<link rel="import">`

```js
oust({ 
	src: 'test/imports.html', 
	selector: 'link[rel="import"]', 
	attribute: 'href' 
	}, function ( hrefs ){
		console.log( hrefs );
	});
```

#### Or from HTML string input:

```js
oust({ 
	source: '<html><link rel="stylesheet" href="styles/main.css"></html>' 
	}, function ( hrefs ){
		console.log( hrefs );
	});
```

### API

#### Options

Attribute       | Default   | Description
---             | ---       | ---
`src`           | ``        | a valid path to the file you wish to parse
`source`        | ``        | a valid string to parse for references
`selector`      | `link[rel="stylesheet"]`        | a selector to query for
`attribute`        | `href`        | an attribute to read from the selector query

The second parameter to `oust()` is a callback function which will include the array of resources discovered.

### License

Released under an Apache 2 license. © Google 2014.