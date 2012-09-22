
/**
 * Module dependencies.
 */
var fs = require('fs')
  , clientjs = require('./client');


/**
 * Render page with the given `map` object.
 *
 * @param {Object} map
 * @api public
 */
exports.render = function(map) {
 
  var template = [
        '<!doctype html>'
      , '<html>'
      , '<head>'
      ,   '<title>{{ title }}</title>'
      ,   '<link rel="stylesheet" href="{{ theme }}.css"/>'
      , '</head>'
      , '<body>'
      ,   '{{ body }}'
      , '</body>'
      , '</html>'
  ].join('\n');       
          
  map && Object.keys(map).forEach(function(key){
    var reg = new RegExp("{{\\s*" + key + "\\s*}}", "g");
    template = template.replace(reg, map[key]);
  });

  return template + clientjs;

};

