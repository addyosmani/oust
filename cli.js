#!/usr/bin/env node

'use strict';

const fs = require('fs');
const minimist = require('minimist');
const pkg = require('./package.json');
const oust = require('.');

const argv = minimist(process.argv.slice(2));

function printHelp() {
    console.log([
        pkg.description,
        '',
        'Usage',
        '  $ oust <filename> <type>',
        '',
        'Example',
        '  $ oust index.html scripts'
    ].join('\n'));
}

if (argv.v || argv.version) {
    console.log(pkg.version);
    process.exit(0);
}

if (argv.h || argv.help || argv._.length === 0) {
    printHelp();
    process.exit(0);
}

const file = argv._[0];
const type = argv._[1];

fs.readFile(file, (err, data) => {
    if (err) {
        console.error('Error opening file:', err.message);
        process.exit(1);
    }

    console.log(oust(data, type).join('\n'));
});
