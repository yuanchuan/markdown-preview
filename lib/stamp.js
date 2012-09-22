
/**
 * A shared timestamp.
 */
var timestamp = module.exports = {};


var stamp = Date.now();


/**
 * Get timestamp.
 *
 * @return {String} 
 * @api public
 */
timestamp.get = function() {
  return stamp;
};


/**
 * Upadate timestamp.
 * @api public
 */
timestamp.update = function() {
  stamp = Date.now();
};

