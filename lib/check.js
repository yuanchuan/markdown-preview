var fs   = require('fs')
  , path = require('path')

module.exports = function(filename) {
  return new check(filename);
}

function check(filename) {
  this.filename = filename;
  this.types = [];
  this.valid = null;
};


check.prototype.accept = function(types) {
  this.types = types;
  return this;
};

check.prototype.pass = function(fn) {
  var filename = this.filename;
  fn && this.validate(function(result, type) {
    result && fn(filename, type);
  });
  return this;
};

check.prototype.fail = function(fn) {
  var filename = this.filename;
  fn && this.validate(function(result, type) {
    result || fn(filename, type);
  });
  return this;
};


check.prototype.validate = function(fn) {
  var type = path.extname(this.filename).substr(1) 
    , isTypeAccepted = !!~this.types.indexOf(type);

  if (this.valid !== null) {
    fn(this.valid, type);
    return this;
  };

  fs.stat(this.filename, function(err, stats) {
    fn( 
        this.valid = stats && stats.isFile() && isTypeAccepted && true || false
      , type
    );
  }); 
  return this;
};
 
