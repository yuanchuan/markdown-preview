
/**
 * Module dependencies.
 */
var fs = require('fs');
var http = require('http');
var path = require('path');
var join = path.join;
var url = require('url');
var qs = require('querystring');
var watch = require('node-watch');

var check = require('./check');
var parser = require('./parser');
var countdown = require('./countdown');
var template = require('./template');
var reswrap = require('./reswrap');
var read = require('./read');
var R = require('./global');         


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

function getTheme(theme) {
  if (theme) {
    theme = read(path.resolve(theme));
  } else {
    theme = read(join(__dirname, '../template/default.css'));
  }
  return theme;
}


/**
 * Http handler for the web server
 */
function handler(req, res) {

  var parsedUrl = url.parse(req.url)
  var callback = qs.parse(parsedUrl.query).callback
  var filename = decodeURI(parsedUrl.path.substr(1))
  var basename = path.basename(filename)
  var extname = path.extname(basename)
  var response = reswrap(res);
  var notfound = function() {
    response.writeHead(404, 'text').end('');
  };

  if (req.method === 'GET' && parsedUrl.pathname === '/jsonp-request') {
    exitCountdown.restart();
    response
      .writeHead(200, 'js')
      .end(callback +'('+ R.get('stamp') +')');  

    return;
  } 

  if (/^\.css$/.test(extname)) {
    check(filename)
      .pass(function(name, type) {
        response
          .writeHead(200, 'css')
          .pipeWith(fs.createReadStream(path.resolve(name)));
      }).fail(notfound);

    return;
  }

  if (/^\.(md|markdown|html)$/.test(extname)) {
    check(filename)
      .pass(function() {
        response
          .writeHead(200, 'html')
          .end(template.render({
            title: basename,
            highlight: R.get('highlight') || 'default',
            theme: getTheme(R.get('css')),
            body:  parser.parse(read(path.resolve(filename)))
          }));        
      }).fail(notfound);

    return;
  }

  // Image or some other resources.
  check(filename)
    .pass(function(name) {
      response
        .writeHead(200, name)
        .pipeWith(fs.createReadStream(name));
    }).fail(notfound)
};
