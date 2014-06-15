'use strict';
var fs = require('fs');
var assert = require('assert');
var oust = require('../index');

it('should return an array of stylesheet link hrefs', function (done) {
	fs.readFile('test/sample/index.html', function read(err, data) {
		var links = oust(data, 'stylesheets');
		assert(links.length == 2);
		assert(links[0] == 'bower_components/bootstrap/dist/css/bootstrap.css');
		assert(links[1] == 'styles/main.css');
		done();
	});
});

it('should return an array of refs when passed a HTML string', function (done) {
	var links = oust('<html><link rel="stylesheet" href="styles/main.css"></html>', 'stylesheets');
	assert(links.length == 1);
	assert(links[0] == 'styles/main.css');
	done();
});

it('should return an array of script srcs', function (done) {
	fs.readFile('test/sample/index.html', function read(err, data) {
		var links = oust(data, 'scripts');
		assert(links.length == 1);
		assert(links[0] == 'scripts/main.js');
		done();
	});
});

it('should return an array of HTML imports', function (done) {
	fs.readFile('test/imports.html', function read(err, data) {
		var links = oust(data, 'imports');
		assert(links.length == 3);
		assert(links[0] == '../polymer/polymer.html');
		assert(links[1] == '../core-ajax/core-ajax.html');
		done();
	});
});

it('should return an array of link URLs', function (done) {
	fs.readFile('test/sample/index.html', function read(err, data) {
		var links = oust(data, 'links');
		assert(links.length == 4);
		assert(links[0] == 'index.html');
		assert(links[1] == 'about.html');
		assert(links[2] == 'contact.html');
		done();
	});
});

it('should fail if no valid source is specified', function (done) {
	try {
		var links = oust();
	} catch (err) {
		 if(/ReferenceError: src is not defined/.test(err)) {
		 	return true;
		 }
		done();
	}
});

it('should fail if no valid type is specified', function (done) {
		fs.readFile('test/imports.html', function read(err, data) {
			try {
				var links = oust(data);
			} catch (e) {
				 if(/ReferenceError: type is not defined/.test(err)) {
				 	return true;
				 }
				done();				
			}
		});
});