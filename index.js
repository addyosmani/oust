/*!
 * Written by Addy Osmani
 * Copyright (C) 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var fs      = require( 'fs' );
var path    = require( 'path' );
var cheerio = require( 'cheerio' );

module.exports = function ( options ) {
    if ( !options.src && !options.source ) {
        throw new Error( 'A valid source must be specified' );
        process.exit(1);
    }
    options = options || {};
    options.selector = options.selector || 'link[rel="stylesheet"]';
    options.attribute =  options.attribute  || 'href';

    var html = options.source || fs.readFileSync( path.join(process.cwd(), options.src ),'utf8' );
    var $ = cheerio.load( html );
    var linkList = [];
    var files = $( options.selector ).map(function( i, elem ){
        return $( elem ).attr( options.attribute );
    }).toArray().filter(function( item ){
        linkList.push( item );
        return ( item !== undefined && item.substring( 0 ,4 ) !== 'http' && item.substring( 0 , 2 ) !== '//' );
    });

    return linkList;
}
