module.exports = function(action, timeout) {
  return new countdown(action, timeout);
}


function countdown(action, timeout) {
  this.action = action;
  this.timeout = timeout;
  this._init();
}

countdown.prototype._init = function() {
  this.timer = setTimeout(this.action, this.timeout);    
}

countdown.prototype.restart = function() {
  clearTimeout(this.timer);
  this._init();
}
  

