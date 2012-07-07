var http      = require('http')
  , fs        = require('fs')
  , path      = require('path')
  , url       = require('url')

var check     = require('./check')
  , parser    = require('./parser')
  , template  = require('./template')
  , countdown = require('./countdown');

 
var exitCountdown = countdown(function() {
  process.exit(1);
}, 4e3);  


var response = function(res, code,type, content) {
  var map = {
      html: 'text/html;charset=utf-8' 
    , jpeg: 'image/jpeg'
    , text: 'text/plain'
  }
  res.writeHead(code, {'Content-Type': map[type]});
  res.end(content);
};
 

var handler = function(req, res) {
  var filename = decodeURI(url.parse(req.url).path.substr(1))
    , basename = path.basename(filename);

  if (req.url == '/get-markdown-preview-response-data') {
    exitCountdown.restart();
    response(res, 200, 'jpeg', '');
    return;
  }

  check(filename, function(ok) {
    if (ok) {
      fs.readFile(filename, 'utf-8', function(err, input) {
        response(res, 200, 'html', template.render({
            title: basename
          , body: parser.parse(input)
        }));
      });
    } else {
      response(res, 404, 'text', 'Cannot open file ' + basename);
    }
  });
}


exports.startAt = (function() {
  var server = http.createServer(handler);
  return function(port, fn) {
    exitCountdown.start();
    http
      .get('http://localhost:' + port, fn)
      .on('error', function(){
        server.listen(port);
        fn();
      });
  };
}());
 
