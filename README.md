# oust

[![CI](https://img.shields.io/github/actions/workflow/status/addyosmani/oust/test.yml?branch=master&label=CI&logo=github)](https://github.com/addyosmani/oust/actions/workflows/test.yml?query=branch%3Amaster)
[![npm version](https://img.shields.io/npm/v/oust?logo=npm&logoColor=fff)](https://www.npmjs.com/package/oust)

> Extract URLs to stylesheets, scripts, links, images or HTML imports from HTML

## Install

```sh
npm install oust -D
```

## Usage

First include:

```js
const oust = require('oust');
```

Resource links can then be extracted from either files:

### Extract stylesheets references `<link rel="stylesheet">`

```js
const hrefs = oust(htmlString, 'stylesheets');
```

### Extract stylesheets references with media print `<link rel="stylesheet" media="print">`

```js
const hrefs = oust(htmlString, 'stylesheets', (i, $el) => {
  return $el.attr('media') === 'print';
});
```

### Extract script references `<script src>`

```js
const srcs = oust(htmlString, 'scripts');
```

### Extract HTML imports `<link rel="import">`

```js
const hrefs = oust(htmlString, 'imports');
```

### Extract style preload references `<link rel="preload" as="style">`

```js
const hrefs = oust(htmlString, 'preload');
```

### Extract URL references `<a href>`

```js
const srcs = oust(htmlString, 'links');
```

### Extract image source references `<img src>`

```js
const srcs = oust(htmlString, 'images');
```

### Extract inline styles `<style>...</style>`

```js
const styles = oust(htmlString, 'styles');
```

### Extract preload and stylesheet references combined

```js
const hrefs = oust(htmlString, ['preload', 'stylesheets']);
```

### Extract cheerio elements alongside the value

Useful for post processing/filtering as you get an array of matched elements
with cheerio convenience syntax (e.g. `$el.attr()`)

```js
const srcs = oust.raw(htmlString, '...');

/*
-> [
  {value: '...', $el: '...'},
  {value: '...', $el: '...'},
  ...
 ]
*/
```

## API

### Options

Attribute  | Default  | Description
---        | ---      | ---
`src`      | not set  | a valid HTML string to parse for references
`type`     | not set  | one of `stylesheets`, `scripts`, `imports`, `preload`, `styles`, `links`, `images`

## CLI

```sh
npm install --global oust
```

```sh
Extract URLs to stylesheets, scripts, links, images or HTML imports from HTML

Usage:
  $ oust <filename> <type>
```

### Extract stylesheets references `<link rel="stylesheet">`

```sh
oust myFile.html stylesheets
```

### Extract script references `<script src>`

```sh
oust myFile.html scripts
```

### Extract HTML imports `<link rel="import">`

```sh
oust myFile.html imports
```

### Extract URL references `<a href>`

```sh
oust myFile.html links
```

### Extract image source references `<img src>`

```sh
oust myFile.html images
```

## License

Released under the [Apache 2 license](LICENSE). © Google 2014.
