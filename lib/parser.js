var showdown = require('showdown')
  , converter = new showdown.converter();

exports.parse = function(input) {
  return converter.makeHtml(input);
};
  
