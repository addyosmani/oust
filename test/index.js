'use strict';

const fs = require('fs');
const {test} = require('uvu');
const assert = require('uvu/assert');
const oust = require('..');

const read = file => fs.readFileSync(file, 'utf8');

test('should return an array of stylesheet link hrefs', () => {
  const links = oust(read('test/fixtures/sample/index.html'), 'stylesheets');
  const expected = ['bower_components/bootstrap/dist/css/bootstrap.css', 'styles/main.css'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of refs when passed a HTML string', () => {
  const links = oust('<html><link rel="stylesheet" href="styles/main.css"></html>', 'stylesheets');
  const expected = ['styles/main.css'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of stylesheet link cheerio elements', () => {
  const links = oust.raw(read('test/fixtures/media.html'), 'stylesheets');
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
  const links = oust(read('test/fixtures/sample/index.html'), 'scripts');
  const expected = ['scripts/main.js'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of HTML imports', () => {
  const links = oust(read('test/fixtures/imports.html'), 'imports');
  const expected = ['../polymer/polymer.html', '../core-ajax/core-ajax.html', '../core-input/core-input.html'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of stylesheet preload hrefs', () => {
  const links = oust(read('test/fixtures/sample/index.html'), 'preload');
  const expected = ['styles/preload.css'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of link URLs', () => {
  const links = oust(read('test/fixtures/sample/index.html'), 'links');
  const expected = ['index.html', 'about.html', 'contact.html', '#'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return an array of image sources', () => {
  const links = oust(read('test/fixtures/sample/index.html'), 'images');
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
  const links = oust(read('test/fixtures/preload-stylesheet.html'), 'stylesheets');
  const expected = ['assets/css/bootstrap.css'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return preloads with multiple rel values', () => {
  const links = oust(read('test/fixtures/preload-stylesheet.html'), 'preload');
  const expected = ['assets/css/bootstrap.css'];

  assert.instance(links, Array);
  assert.is(links.length, expected.length);
  assert.equal(links, expected);
});

test('should return inline styles from styles tag', () => {
  const styles = oust(read('test/fixtures/styles.html'), 'styles');
  const expected = ['body {padding:0}', 'h1 {font-size: 5rem}'];

  assert.instance(styles, Array);
  assert.is(styles.length, expected.length);
  assert.equal(styles, expected);
});

test('should return hrefs and inline styles in correct order', () => {
  const styles = oust(read('test/fixtures/mixed.html'), ['styles', 'preload', 'stylesheets']);
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
  assert.not.throws(() => {
    oust(read('test/fixtures/empty.html'), 'stylesheets');
  });
});

test('should fail if no source is specified', () => {
  assert.throws(() => {
    oust();
  }, 'Error: `src` and `type` required');
});

test('should fail if no type is specified', () => {
  assert.throws(() => {
    oust(read('test/fixtures/imports.html'));
  }, 'Error: `src` and `type` required');
});

test('should fail if no valid type is specified', () => {
  assert.throws(() => {
    oust(read('test/fixtures/imports.html'), 'invalid-type');
  }, 'Error: Invalid `type` value "invalid-type"');
});

test.run();
