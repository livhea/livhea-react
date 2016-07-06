/**
 * @flow
 */

'use strict';

const createReducer = require('./createParseReducer');

export type Content = {
  image: string;
  title: string;
  body: string;
};

function fromContent(content: Object): Content {
  return {
    title: content.get('title'),
    image: content.get('image'),
    body: content.get('body')
  };
}

module.exports = createReducer('LOADED_CONTENT', fromContent);
