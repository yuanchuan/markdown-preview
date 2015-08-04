/**
 * Module dependencies. 
 */
var showdown = require('showdown');
var marked   = require('marked');
var R        = require('./global');

marked.setOptions({
  renderer:    new marked.Renderer(),
  gfm:         true,
  tables:      true,
  breaks:      false,
  pedantic:    false,
  sanitize:    true,
  smartLists:  true,
  smartypants: false
});

// Initialize a showdown coventer. 
var converter = showdown.converter 
  ? new showdown.converter()
  : new showdown.Converter();

/**
 * Markdown parser with showdown.
 *
 * @param {String} input
 * @api public
 */

exports.parse = function(input) {

  var useMarked =  R.get("marked");

  if ( useMarked == "true" ) {
    return marked(input);
  } else {
    return converter.makeHtml(input);
  }
};

