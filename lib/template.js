var join = require('path').join;
var clientjs = require('./client');
var read = require('./read');


/**
 * Render page with the given `map` object.
 *
 * @param {Object} map
 * @api public
 */
exports.render = function(map) {
  var template = read(join(__dirname, '../template/default.html'));
  map && Object.keys(map).forEach(function(key) {
    var reg = new RegExp("{{\\s*" + key + "\\s*}}", "g");
    template = template.replace(reg, map[key]);
  });
  return template + clientjs;
};
