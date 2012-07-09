module.exports = function(res) {
  return new response(res);
};


function response(res) {
  this.res = res;
  return this;
};

response.prototype.writeHead = function(code, type) {
  var map = {
      html: 'text/html;charset=utf-8'
    , jpeg: 'image/jpeg'
    , text: 'text/plain;charset=utf-8'
    , css:  'text/css;charset=utf-8'
  };
  this.res.writeHead(code, {'Content-Type': map[type]});
  return this;
};

response.prototype.end = function(content) {
  this.res.end(content);
};

response.prototype.pipe = function(stream) {
  stream.pipe(this.res);
};

