var http     = require('http')
  , fs       = require('fs')
  , path     = require('path')
  , url      = require('url')
  , check    = require('./check')
  , parser   = require('./parser')
  , template = require('./template');
  
exports.startAt = (function() {
  var server = http.createServer(handler)
  return function(port, fn) {
    http
      .get('http://localhost:' + port, fn)
      .on('error', function(){
        server.listen(port);
        fn();
      });
  };
}());

function handler(req, res) {
  var filename = url.parse(req.url).path.substr(1)
    , basename = path.basename(filename);

  if (req.url == '/close') {
    process.exit(1);
  }

  check(filename, function(ok) {
    if (ok) {
      fs.readFile(filename, 'utf-8', function(err, input) {
        res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        res.end(
          template.render({
              title: basename
            , body: parser.parse(input)
          })
        );
      });
    } else {
      res.writeHead(404, {'Content-Type':'text/plain;charset=utf-8'});
      res.end('Cannot open file ' + basename);
    }
  });
}
