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
    selector: 'link[rel*="stylesheet"]',
    attribute: 'href',
  },
  scripts: {
    selector: 'script',
    attribute: 'src',
  },
  imports: {
    selector: 'link[rel="import"]',
    attribute: 'href',
  },
  preload: {
    selector: 'link[rel*="preload"][as="style"]',
    attribute: 'href',
  },
  links: {
    selector: 'a',
    attribute: 'href',
  },
  images: {
    selector: 'img',
    attribute: 'src',
  },
  styles: {
    selector: 'style',
    method: 'text',
  },
};

function oust(src, type, raw = false) {
  if (typeof src !== 'string' || !type) {
    throw new Error('`src` and `type` required');
  }

  const validTypes = Object.keys(types);
  const typeArray = Array.isArray(type) ? type : [type];

  for (const type of typeArray) {
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid \`type\` value "${type}". Choose one of: ${validTypes.join(', ')}`);
    }
  }

  const chosenTypes = typeArray.map(type => ({...types[type], type}));
  const selector = chosenTypes.map(type => type.selector).join(', ');
  const $ = cheerio.load(src);

  return Array.prototype.map.call($(selector), element => {
    const $element = $(element);
    const chosenType = chosenTypes.find(type => $element.is(type.selector));

    let value = '';
    if (chosenType.method && $element[chosenType.method]) {
      value = $element[chosenType.method]();
    } else if (chosenType.attribute) {
      value = $element.attr(chosenType.attribute);
    }

    if (raw === true) {
      return {
        $el: $element,
        type: chosenType.type,
        value,
      };
    }

    return value;
  });
}

module.exports = (src, type) => oust(src, type);

module.exports.raw = (src, type) => oust(src, type, true);
