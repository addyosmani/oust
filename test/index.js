/* eslint-env mocha */

'use strict';

const fs = require('fs');
const assert = require('assert');
const oust = require('..');

const read = file => fs.readFileSync(file, 'utf8');

it('should return an array of stylesheet link hrefs', () => {
    const links = oust(read('test/sample/index.html'), 'stylesheets');
    const expected = ['bower_components/bootstrap/dist/css/bootstrap.css', 'styles/main.css'];

    assert.strictEqual(Array.isArray(links), true);
    assert.strictEqual(links.length, expected.length);
    assert.deepStrictEqual(links, expected);
});

it('should return an array of refs when passed a HTML string', () => {
    const links = oust('<html><link rel="stylesheet" href="styles/main.css"></html>', 'stylesheets');
    const expected = ['styles/main.css'];

    assert.strictEqual(Array.isArray(links), true);
    assert.strictEqual(links.length, expected.length);
    assert.deepStrictEqual(links, expected);
});

it('should return an array of stylesheet link cheerio elements', () => {
    const links = oust.raw(read('test/media.html'), 'stylesheets');
    const expected = [
        {
            value: 'styles/main.css'
        },
        {
            value: 'styles/print.css'
        }
    ];

    assert.strictEqual(Array.isArray(links), true);
    assert.strictEqual(links.length, expected.length);

    for (const [index, link] of links.entries()) {
        assert.strictEqual(typeof link.$el.attr, 'function');
        assert.strictEqual(typeof link.$el.html, 'function');
        assert.strictEqual(typeof link.$el.val, 'function');
        assert.strictEqual(typeof link.$el.contents, 'function');
        assert.strictEqual(link.value, expected[index].value);
    }
});

it('should return an array of script srcs', () => {
    const links = oust(read('test/sample/index.html'), 'scripts');
    const expected = ['scripts/main.js'];

    assert.strictEqual(Array.isArray(links), true);
    assert.strictEqual(links.length, expected.length);
    assert.deepStrictEqual(links, expected);
});

it('should return an array of HTML imports', () => {
    const links = oust(read('test/imports.html'), 'imports');
    const expected = ['../polymer/polymer.html', '../core-ajax/core-ajax.html', '../core-input/core-input.html'];

    assert.strictEqual(Array.isArray(links), true);
    assert.strictEqual(links.length, expected.length);
    assert.deepStrictEqual(links, expected);
});

it('should return an array of stylesheet preload hrefs', () => {
    const links = oust(read('test/sample/index.html'), 'preload');
    const expected = ['styles/preload.css'];

    assert.strictEqual(Array.isArray(links), true);
    assert.strictEqual(links.length, expected.length);
    assert.deepStrictEqual(links, expected);
});

it('should return an array of link URLs', () => {
    const links = oust(read('test/sample/index.html'), 'links');
    const expected = ['index.html', 'about.html', 'contact.html', '#'];

    assert.strictEqual(Array.isArray(links), true);
    assert.strictEqual(links.length, expected.length);
    assert.deepStrictEqual(links, expected);
});

it('should return an array of image sources', () => {
    const links = oust(read('test/sample/index.html'), 'images');
    const expected = [
        'http://placekitten.com/200/300',
        'http://placekitten.com/300/400',
        'http://placekitten.com/500/600'
    ];

    assert.strictEqual(Array.isArray(links), true);
    assert.strictEqual(links.length, expected.length);
    assert.deepStrictEqual(links, expected);
});

it('should return stylesheets with multiple rel values', () => {
    const links = oust(read('test/preload-stylesheet.html'), 'stylesheets');
    const expected = ['assets/css/bootstrap.css'];

    assert.strictEqual(Array.isArray(links), true);
    assert.strictEqual(links.length, expected.length);
    assert.deepStrictEqual(links, expected);
});

it('should return preloads with multiple rel values', () => {
    const links = oust(read('test/preload-stylesheet.html'), 'preload');
    const expected = ['assets/css/bootstrap.css'];

    assert.strictEqual(Array.isArray(links), true);
    assert.strictEqual(links.length, expected.length);
    assert.deepStrictEqual(links, expected);
});

it('should return styles from styles tag', () => {
    const styles = oust(read('test/styles.html'), 'styles');
    const expected = ['body {padding:0}', 'h1 {font-size: 5rem}'];

    assert.strictEqual(Array.isArray(styles), true);
    assert.strictEqual(styles.length, expected.length);
    assert.deepStrictEqual(styles, expected);
});

it('should not fail if an empty source is passed', () => {
    assert.doesNotThrow(() => {
        oust(read('test/empty.html'), 'stylesheets');
    });
});

it('should fail if no source is specified', () => {
    assert.throws(() => {
        oust();
    }, /^Error: `src` and `type` required$/);
});

it('should fail if no type is specified', () => {
    assert.throws(() => {
        oust(read('test/imports.html'));
    }, /^Error: `src` and `type` required$/);
});

it('should fail if no valid type is specified', () => {
    assert.throws(() => {
        oust(read('test/imports.html'), 'invalid-type');
    }, /^Error: Invalid `type` value "invalid-type"/);
});
