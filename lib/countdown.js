
/**
 * Initialize a `countdown` instance with callback function and timeout.
 *
 * @param {Function} action
 * @param {Number} timeout
 * @api public
 */
module.exports = function(action, timeout) {
  return new countdown(action, timeout);
}


/**
 * Initialize a new `countdown` with callback function and timeout.
 *
 * @param {Function} action
 * @param {Number} timeout
 */
function countdown(action, timeout) {
  this.action = action;
  this.timeout = timeout;
  this.timer = null;
}


/**
 * Start the timer.
 * @api public
 */
countdown.prototype.start = function() {
  this.timer = setTimeout(this.action, this.timeout);
}


/**
 * Restart the timer.
 * @api public
 */
countdown.prototype.restart = function() {
  clearTimeout(this.timer);
  this.start();
}


