var read = require('./read');
var path = require('path');
var join = path.join;

function getTheme(theme) {
  if (theme) {
    theme = read(path.resolve(theme));
  } else {
    theme = read(join(__dirname, '../template/default.css'));
  }
  return theme;
}

module.exports = getTheme;
