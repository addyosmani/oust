#!/usr/bin/env node

var oust = require('../index');
var pkg = require('../package.json');
var fs = require('fs');

var argv = require('minimist')(process.argv.slice(2));

var printHelp = function() {
    console.log('oust');
    console.log(pkg.description);
    console.log('');
    console.log('Usage:');
    console.log('  $ oust <filename> <selector>');
};

if(argv.h || argv.help) {
    printHelp();
    return;
}

if(argv.v || argv.version) {
    console.log(pkg.version);
    return;
}

var file = argv._[0];
var type = argv._[1];

fs.readFile(file, function(err, data) {
    if(err) {
        console.error('Error opening file:', err.message);
        process.exit(1);
    }
    var res = oust(data, type);
    console.log(res.join("\n"));
});


