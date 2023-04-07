#!/usr/bin/env node

'use strict';

const fs = require('fs');
const minimist = require('minimist');
const {description, version} = require('./package.json');
const oust = require('.');

const argv = minimist(process.argv.slice(2));

function printHelp() {
  console.log(`
${description}

Usage:
  $ oust <filename> <type>

Example:
  $ oust index.html scripts`);
}

if (argv.v || argv.version) {
  console.log(version);
  process.exit(0);
}

if (argv.h || argv.help || argv._.length === 0) {
  printHelp();
  process.exit(0);
}

const [file, type] = argv._;

fs.promises.readFile(file)
  .then(data => console.log(oust(data, type).join('\n')))
  .catch(error => {
    console.error(`Error opening file: ${error.message}`);
    process.exit(1);
  });
