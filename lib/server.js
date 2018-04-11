
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
var getTheme = require('./getTheme');


/**
 * Countdown to exit the program.
 */
var exitCountdown;

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
    var timeout = parseInt(R.get('timeout'), 10) * 1e3;
    exitCountdown = countdown(function() {
      process.exit();
    }, timeout || 3e3);

    http
      .get('http://localhost:' + port, fn)
      .on('error', function() {
        //port free
        server.listen(port, fn);
      });
  };
}());


/**
 * Http handler for the web server
 */
function handler(req, res) {

  var parsedUrl = url.parse(req.url)
  var callback = qs.parse(parsedUrl.query).callback
  var filename = decodeURI(parsedUrl.path.substr(1).split('?')[0])
  var basename = path.basename(filename.split('?')[0])
  var extname = path.extname(basename)
  var response = reswrap(res);
  var notfound = function() {
    response.writeHead(404, 'text').end('');
  };

  if (req.method === 'GET' && parsedUrl.pathname === '/jsonp-request') {
    if (!!exitCountdown) {
      exitCountdown.restart();
    }

    response
      .writeHead(200, 'js')
      .end(callback +'('+ R.get('stamp') +')');

    return;
  }

  var serve;
  if (/^\/template/.test(parsedUrl.pathname)) {
    serve = check(join(__dirname, '..', filename))
  } else if (/^\/node_modules/.test(parsedUrl.pathname)) {
    serve = check(join(__dirname, '..', filename))
  }
  if (serve) {
    serve.pass(function(name, type) {
      response
        .writeHead(200, extname.substr(1))
        .pipeWith(fs.createReadStream(
          path.resolve(name)
        ))
    }).fail(notfound);
    return;
  }

  if (/^\.(md|mkd|markdown|html)$/.test(extname)) {
    check(filename)
      .pass(function() {
        response
          .writeHead(200, 'html')
          .end(template.render({
            title: basename,
            highlight: R.get('highlight') || 'default',
            theme: getTheme(R.get('css')),
            width: R.get('width'),
            body: parser.parse(read(path.resolve(filename)))
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
