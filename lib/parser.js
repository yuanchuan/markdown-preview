
/**
 * Module dependencies. 
 */
var showdown = require('showdown');


// Initialize a showdown coventer. 
var converter = new showdown.converter();


/**
 * Markdown parser with showdown.
 *
 * @param {String} input
 * @api public
 */
exports.parse = function(input) {
  return converter.makeHtml(input);
};
  
