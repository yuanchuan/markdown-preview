var fs   = require('fs')
  , path = require('path');


var acceptTypes = [
    'md'
  , 'markdown'
];


module.exports = function(filename, fn) {
  var extname = path.extname(filename).substr(1) 
    , isTypeAccepted = !!~acceptTypes.indexOf(extname);

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
