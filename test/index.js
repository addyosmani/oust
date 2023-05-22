'use strict';

const fs = require('fs');
const {test} = require('uvu');
const assert = require('uvu/assert');
const oust = require('../index.js');

const read = file => fs.readFileSync(file, 'utf8');

test('should return an array of stylesheet link hrefs', () => {
  const fixture = read('test/fixtures/sample/index.html');
  const links = oust(fixture, 'stylesheets');
  const expected = [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'styles/main.css',
  ];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of refs when passed an HTML string', () => {
  const fixture = '<html><link rel="stylesheet" href="styles/main.css"></html>';
  const links = oust(fixture, 'stylesheets');
  const expected = ['styles/main.css'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of stylesheet link cheerio elements', () => {
  const fixture = read('test/fixtures/media.html');
  const links = oust.raw(fixture, 'stylesheets');
  const expected = [
    {
      value: 'styles/main.css',
    },
    {
      value: 'styles/print.css',
    },
  ];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);

  for (const [index, link] of links.entries()) {
    assert.type(link.$el.attr, 'function');
    assert.type(link.$el.html, 'function');
    assert.type(link.$el.val, 'function');
    assert.type(link.$el.contents, 'function');
    assert.is(link.value, expected[index].value);
  }
});

test('should return an array of script srcs', () => {
  const fixture = read('test/fixtures/sample/index.html');
  const links = oust(fixture, 'scripts');
  const expected = ['scripts/main.js'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of HTML imports', () => {
  const fixture = read('test/fixtures/imports.html');
  const links = oust(fixture, 'imports');
  const expected = [
    '../polymer/polymer.html',
    '../core-ajax/core-ajax.html',
    '../core-input/core-input.html',
  ];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of stylesheet preload hrefs', () => {
  const fixture = read('test/fixtures/sample/index.html');
  const links = oust(fixture, 'preload');
  const expected = ['styles/preload.css'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of link URLs', () => {
  const fixture = read('test/fixtures/sample/index.html');
  const links = oust(fixture, 'links');
  const expected = [
    'index.html',
    'about.html',
    'contact.html',
    '#',
  ];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of image sources', () => {
  const fixture = read('test/fixtures/sample/index.html');
  const links = oust(fixture, 'images');
  const expected = [
    'http://placekitten.com/200/300',
    'http://placekitten.com/300/400',
    'http://placekitten.com/500/600',
  ];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return stylesheets with multiple rel values', () => {
  const fixture = read('test/fixtures/preload-stylesheet.html');
  const links = oust(fixture, 'stylesheets');
  const expected = ['assets/css/bootstrap.css'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return preloads with multiple rel values', () => {
  const fixture = read('test/fixtures/preload-stylesheet.html');
  const links = oust(fixture, 'preload');
  const expected = ['assets/css/bootstrap.css'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return inline styles from styles tag', () => {
  const fixture = read('test/fixtures/styles.html');
  const styles = oust(fixture, 'styles');
  const expected = ['body {padding:0}', 'h1 {font-size: 5rem}'];

  assert.instance(styles, Array);
  assert.is(styles.length, expected.length);
  assert.equal(styles, expected);
});

test('should return hrefs and inline styles in correct order', () => {
  const fixture = read('test/fixtures/mixed.html');
  const styles = oust(fixture, ['styles', 'preload', 'stylesheets']);
  const expected = [
    'body {padding:0}',
    'assets/css/bootstrap.css',
    'h1 {font-size: 5rem}',
    'styles/main.css',
  ];

  assert.instance(styles, Array);
  assert.is(styles.length, expected.length);
  assert.equal(styles, expected);
});

test('should not fail if an empty source is passed', () => {
  const fixture = read('test/fixtures/empty.html');
  assert.not.throws(() => {
    oust(fixture, 'stylesheets');
  });
});

test('should fail if no source is specified', () => {
  assert.throws(() => {
    oust();
  }, 'Error: `src` and `type` required');
});

test('should fail if no type is specified', () => {
  const fixture = read('test/fixtures/imports.html');
  assert.throws(() => {
    oust(fixture);
  }, 'Error: `src` and `type` required');
});

test('should fail if no valid type is specified', () => {
  const fixture = read('test/fixtures/imports.html');
  assert.throws(() => {
    oust(fixture, 'invalid-type');
  }, 'Error: Invalid `type` value "invalid-type"');
});

test.run();
