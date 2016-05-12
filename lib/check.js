
/**
 *  Module dependencies.
 */
var fs   = require('fs');
var path = require('path');


/**
 * Initialize a `check` instance with the given filename.
 *
 * @param {String} filename
 * @api public
 */
module.exports = function(filename) {
  return new check(filename);
};


/**
 * Initialize a new `check` with the given filename.
 *
 * @param {String} filename
 * @api private
 */
function check(filename) {
  this.filename = filename && path.resolve(filename) || '';
  this.types = [];
  this.valid = null;
};


/**
 * Set valid file types.
 *
 * @param {Array|String} types
 * @api public
 */
check.prototype.accept = function(types) {
  this.types = types;
  return this;
};


/**
 * Catch if the filename has passed the validation.
 *
 * @param {Function} fn
 * @api public
 */
check.prototype.pass = function(fn) {
  var filename = this.filename;
  fn && this._validate(function(result, type) {
    result && fn(filename, type);
  });
  return this;
};


/**
 * Catch if the filename failed to validate.
 *
 * @param {Function} fn
 * @api public
 */
check.prototype.fail = function(fn) {
  var filename = this.filename;
  fn && this._validate(function(result, type) {
    result || fn(filename, type);
  });
  return this;
};


/**
 * Check if a file exists and matches the specified file types.
 *
 * @param {Function} fn
 * @api private
 */
check.prototype._validate = function(fn) {
  var type = path.extname(this.filename).substr(1);
  var hasType = !!this.types.length;
  var isTypeAccepted = Array.isArray(this.types)
    ? (!!~this.types.indexOf(type))
    : (this.types === type);

  if (this.valid !== null) {
    fn(this.valid, type);
  } else {
    fs.stat(this.filename, function(err, stats) {
      var result
        = this.valid
        = hasType
          ? (stats && stats.isFile() && isTypeAccepted && true || false)
          : (stats && stats.isFile() && true || false);
      fn(result, type);
    });
  }

  return this;
};

