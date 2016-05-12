
/**
 * Module dependencies.
 */
var mime = require('mime');


/**
 *  Create an instance of the response wrapper.
 */
module.exports = function(res) {
  return new response(res);
};


/**
 * Response wrapper for clearer code.
 *
 * @param {Object} res
 */
function response(res) {
  this.res = res;
  return this;
};


/**
 *
 * @param {Number} code
 * @param {String} type
 * @api public
 */
response.prototype.writeHead = function(code, ext) {
  this.res.writeHead(code, {'Content-Type': mime.lookup(ext)});
  return this;
};


/**
 * End the response with `content`.
 *
 * @param {String}
 * @api public
 */
response.prototype.end = function(content) {
  this.res.end(content);
};


/**
 * Pipling to response with a given stream.
 *
 * @param {Stream} stream
 * @api public
 */
response.prototype.pipeWith = function(stream) {
  stream.pipe(this.res);
};

