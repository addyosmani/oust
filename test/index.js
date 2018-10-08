const fs = require('fs');
const assert = require('assert');
const oust = require('..');

it('should return an array of stylesheet link hrefs', () => {
    const links = oust(fs.readFileSync('test/sample/index.html', 'utf8'), 'stylesheets');
    assert(links.length === 2);
    assert(links[0] === 'bower_components/bootstrap/dist/css/bootstrap.css');
    assert(links[1] === 'styles/main.css');
});

it('should return an array of refs when passed a HTML string', () => {
    const links = oust('<html><link rel="stylesheet" href="styles/main.css"></html>', 'stylesheets');
    assert(links.length === 1);
    assert(links[0] === 'styles/main.css');
});

it('should return an array of stylesheet link cheerio elements', () => {
    const links = oust.raw(fs.readFileSync('test/media.html', 'utf8'), 'stylesheets');

    links.forEach(link => {
        assert(typeof link.$el.attr === 'function');
        assert(typeof link.$el.attr === 'function');
        assert(typeof link.$el.html === 'function');
        assert(typeof link.$el.val === 'function');
        assert(typeof link.$el.contents === 'function');
    });

    assert(links.length === 2);
    assert(links[0].value === 'styles/main.css');
    assert(links[1].value === 'styles/print.css');
});

it('should return an array of script srcs', () => {
    const links = oust(fs.readFileSync('test/sample/index.html', 'utf8'), 'scripts');
    assert(links.length === 1);
    assert(links[0] === 'scripts/main.js');
});

it('should return an array of HTML imports', () => {
    const links = oust(fs.readFileSync('test/imports.html', 'utf8'), 'imports');
    assert(links.length === 3);
    assert(links[0] === '../polymer/polymer.html');
    assert(links[1] === '../core-ajax/core-ajax.html');
});

it('should return an array of stylesheet preload hrefs', () => {
    const links = oust(fs.readFileSync('test/sample/index.html', 'utf8'), 'preload');
    assert(links.length === 1);
    assert(links[0] === 'styles/preload.css');
});

it('should return an array of link URLs', () => {
    const links = oust(fs.readFileSync('test/sample/index.html', 'utf8'), 'links');
    assert(links.length === 4);
    assert(links[0] === 'index.html');
    assert(links[1] === 'about.html');
    assert(links[2] === 'contact.html');
});

it('should return an array of image sources', () => {
    const links = oust(fs.readFileSync('test/sample/index.html', 'utf8'), 'images');
    assert(links.length === 3);
    assert(links[0] === 'http://placekitten.com/200/300');
    assert(links[1] === 'http://placekitten.com/300/400');
    assert(links[2] === 'http://placekitten.com/500/600');
});

it('should fail if no valid source is specified', () => {
    assert.throws(() => {
        oust();
    });
});
