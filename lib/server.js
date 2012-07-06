var http     = require("http")
  , fs       = require('fs')
  , path     = require('path')
  , url      = require("url")
  , parser   = require('./parser')
  , template = require('./template');

exports.startAt = function(port) {
  var server = http.createServer(handler);
  server.listen(port || 6000);
}

function handler(req, res) {
  var fname = url.parse(req.url).path.substr(1);
  fs.exists(fname, function(exists) {
    if (exists) {
      fs.readFile(fname, 'utf-8', function(err, input) {
        res.end(
          template.render({
            title: path.basename(fname),
            body: parser.parse(input)
          })
        );
      });
    } else {
      res.end('404 not found');
    }
  });
}
