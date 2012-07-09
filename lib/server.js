var http      = require('http')
  , fs        = require('fs')
  , path      = require('path')
  , url       = require('url')

var check     = require('./check')
  , parser    = require('./parser')
  , template  = require('./template')
  , countdown = require('./countdown')
  , wrapper   = require('./wrapper');

 
var exitCountdown = countdown(function() {
  process.exit(1);
}, 4e3);  


var handler = function(req, res) {
  var filename = decodeURI(url.parse(req.url).path.substr(1))
    , basename = path.basename(filename)
    , response = wrapper(res);

  if (req.url == '/get-markdown-preview-response-data') {
    exitCountdown.restart();
    response.writeHead(200, 'jpeg').end('s');
    return;
  }

  if (path.extname(basename) === '.css') {
    check(path.join(__dirname, '../theme', basename))
      .accept(['css'])
      .pass(function(name, type) {
        response
          .writeHead(200, 'css')
          .pipe(fs.createReadStream(name));
      })
      .fail(function() {
        response.writeHead(404, 'text').end('');
      });
    return;
  }

  check(filename)
    .accept(['md', 'markdown'])
    .pass(function() {
      fs.readFile(filename, 'utf-8', function(err, input) {
        response
          .writeHead(200, 'html')
          .end(template.render({
              title: basename
            , theme: 'github-flavored-markdown'
            , body:  parser.parse(input)
          }));        
      });
    })
    .fail(function() {
      response.writeHead(404, 'text').end('');
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
 
