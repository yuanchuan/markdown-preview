var fs   = require('fs')
  , path = require('path')
  , acceptTypes = [ 'md' , 'markdown' ];

module.exports = function(filename, fn) {
  var type = path.extname(filename).substr(1) 
    , isTypeAccepted = !!~acceptTypes.indexOf(type);

  fs.stat(filename, function(err, stats) {
    fn( 
         stats 
      && stats.isFile() 
      && isTypeAccepted 
      && true 
      || false
    ); 
  });
}
