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

'use strict';

const cheerio = require('cheerio');

const types = {
    stylesheets: {
        selector: 'link[rel="stylesheet"]',
        attribute: 'href'
    },
    scripts: {
        selector: 'script',
        attribute: 'src'
    },
    imports: {
        selector: 'link[rel="import"]',
        attribute: 'href'
    },
    preload: {
        selector: 'link[rel="preload"][as="style"]',
        attribute: 'href'
    },
    links: {
        selector: 'a',
        attribute: 'href'
    },
    images: {
        selector: 'img',
        attribute: 'src'
    }
};

function oust(src, type, raw) {
    if (!src || !type) {
        throw new Error('`src` and `type` required');
    }

    const chosenType = types[type];
    const $ = cheerio.load(src);

    return Array.prototype.map.call($(chosenType.selector), el => {
        const $el = $(el);

        if (raw) {
            return {
                $el,
                value: $el.attr(chosenType.attribute)
            };
        }

        return $el.attr(chosenType.attribute);
    });
}

module.exports = (src, type) => oust(src, type, false);

module.exports.raw = (src, type) => oust(src, type, true);
