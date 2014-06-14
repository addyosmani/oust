#!/usr/bin/env node

var oust = require('../index');
var pkg = require('../package.json');
var fs = require('fs');


var argv = require('minimist')((process.argv.slice(2)))

var printHelp = function() {
	console.log('oust');
	console.log(pkg.description);
	console.log('');
	console.log'Usage:');
	console.log('  $ oust --file <filename> --selector <selector>');
};

if(argv.h || argv.help) {
	printHelp();
	return;
}

if(argv.v || argv.version) {
	console.log(pkg.version);
	return;
}

var file = argv.f || argv.file;
var selector = argv.s || argv.selector;

fs.readFile(file, function(err, data) {
	if(err) {
		console.log('Error opening file:', err.code);
		return;
	}
	var res = oust(data, selector);
	console.log(res.join("\n"));
});


