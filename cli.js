#!/usr/bin/env node
'use strict';
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var pkg = require('./package.json');
var oust = require('./');

function printHelp() {
    console.log([
        pkg.description,
        '',
        'Usage',
        '  $ oust <filename> <type> <filter>',
        '',
        'Example',
        '  $ oust index.html scripts relative'
    ].join('\n'));
}

if (argv.v || argv.version) {
    console.log(pkg.version);
    return;
}

if (argv.h || argv.help || argv._.length === 0) {
    printHelp();
    return;
}

var file = argv._[0];
var type = argv._[1];
var filter = argv._[2];
var delimiter = '\n';

if (argv.d) {
    delimiter = argv.d;
}

fs.readFile(file, function (err, data) {
    if (err) {
        console.error('Error opening file:', err.message);
        process.exit(1);
    }

    console.log(oust(data, type, filter).join(delimiter));
});
