
/**
 * Module dependencies. 
 */
var showdown = require('showdown');


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
  return converter.makeHtml(input);
};
  
