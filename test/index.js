'use strict';
var fs = require('fs');
var assert = require('assert');
var oust = require('../');

it('should return an array of stylesheet link hrefs', function () {
    var links = oust(fs.readFileSync('test/sample/index.html', 'utf8'), 'stylesheets');
    assert(links.length === 2);
    assert(links[0] === 'bower_components/bootstrap/dist/css/bootstrap.css');
    assert(links[1] === 'styles/main.css');
});

it('should return an array of refs when passed a HTML string', function () {
    var links = oust('<html><link rel="stylesheet" href="styles/main.css"></html>', 'stylesheets');
    assert(links.length === 1);
    assert(links[0] === 'styles/main.css');
});

it('should return an array of script srcs', function () {
    var links = oust(fs.readFileSync('test/sample/index.html', 'utf8'), 'scripts');
    assert(links.length === 1);
    assert(links[0] === 'scripts/main.js');
});

it('should return an array of HTML imports', function () {
    var links = oust(fs.readFileSync('test/imports.html', 'utf8'), 'imports');
    assert(links.length === 3);
    assert(links[0] === '../polymer/polymer.html');
    assert(links[1] === '../core-ajax/core-ajax.html');
});

it('should return an array of link URLs', function () {
    var links = oust(fs.readFileSync('test/sample/index.html', 'utf8'), 'links');
    assert(links.length === 4);
    assert(links[0] === 'index.html');
    assert(links[1] === 'about.html');
    assert(links[2] === 'contact.html');
});

it('should return an array of image sources', function () {
    var links = oust(fs.readFileSync('test/sample/index.html', 'utf8'), 'images');
    assert(links.length === 3);
    assert(links[0] === 'http://placekitten.com/200/300');
    assert(links[1] === 'http://placekitten.com/300/400');
    assert(links[2] === 'http://placekitten.com/500/600');
});

it('should fail if no valid source is specified', function () {
    assert.throws(function () {
       oust();
    });
});

it('should fail if no valid type is specified', function () {
    assert.throws(function () {
        oust(fs.readFileSync('test/imports.html', 'utf8'));
    });
});
