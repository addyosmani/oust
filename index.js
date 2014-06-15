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

module.exports = function ( src, type ) {
    if ( !src ) {
        throw new Error( 'A valid source must be specified' );
    }

    if ( !type ) {
        throw new Error( 'A valid type must be specified' );
    }

    // Defaults
    var attribute = 'href';
    var selector = '';

    if ( type == 'stylesheets'){
        selector = 'link[rel="stylesheet"]';
    } else if ( type == 'scripts' ) {
        selector = 'script';
        attribute = 'src';
    } else if ( type == 'imports') {
        selector = 'link[rel="import"]';
    } else if ( type == 'links') {
        selector = 'a';
    }

    var $ = cheerio.load( src );
    var linkList = [];
    var files = $( selector ).map(function( i, elem ){
        return $( elem ).attr( attribute );
    }).toArray().filter(function( item ){
        linkList.push( item );
        return ( item !== undefined && item.substring( 0 ,4 ) !== 'http' && item.substring( 0 , 2 ) !== '//' );
    });

    return linkList;
}
