
/**
 * Module dependencies.
 */
var http      = require('http')
  , fs        = require('fs')
  , path      = require('path')
  , url       = require('url')
  , qs        = require('querystring')
  , watch     = require('node-watch');

var check     = require('./check')
  , parser    = require('./parser')
  , template  = require('./template')
  , countdown = require('./countdown')
  , reswrap   = require('./reswrap')
  , stamp     = require('./stamp');


/**
 * Running server at a given port.
 *
 * @param {Number} port
 * @param {Function} fn
 * @api public
 */
exports.startAt = (function() {
  var server = http.createServer(handler);
  return function(port, fn) {
    http
      .get('http://localhost:' + port, fn)
      .on('error', function() {
        //port free
        server.listen(port, fn);
      });
  };
}());
         

/**
 * Countdown to exit the program.
 */
var exitCountdown = countdown(function() {
  process.exit();
}, 3e3);  



/**
 * Http handler for the web server
 */
function handler(req, res) {

  var parsedUrl = url.parse(req.url)
    , callback = qs.parse(parsedUrl.query).callback
    , filename = decodeURI(parsedUrl.path.substr(1))
    , basename = path.basename(filename)
    , response = reswrap(res);

  if (req.method === 'GET' && parsedUrl.pathname === '/jsonp-request') {
    exitCountdown.restart();
    response
      .writeHead(200, 'js')
      .end(callback +'('+ stamp.get() +')');  

    return;
  } 

  if (/^\.css$/.test(path.extname(basename))) {
    check(path.resolve(__dirname, '../theme', basename))
      .pass(function(name, type) {
        response
          .writeHead(200, 'css')
          .pipeWith(fs.createReadStream(name));
      })
      .fail(function() {
        response.writeHead(404, 'text').end('');
      });

    return;
  }

  if (/^\.(md|markdown)$/.test(path.extname(basename))) {
    check(filename)
      .pass(function() {
        fs.readFile(filename, 'utf-8', function(err, input) {
          response
            .writeHead(200, 'html')
            .end(template.render({
                title: basename
                // TODO:the theme should be configurable.
              , theme: 'github-flavored-markdown'
              , body:  parser.parse(input)
            }));        
        });
      })
      .fail(function() {
        response.writeHead(404, 'text').end('');
      });         

    return;
  }

  // Image or some other resources.
  check(filename)
    .pass(function(name) {
      response
        .writeHead(200, name)
        .pipeWith(fs.createReadStream(name));
    })
    .fail(function() {
      response.writeHead(404, 'text').end('');
    });          
};

