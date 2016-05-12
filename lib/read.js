var fs = require('fs');

module.exports = function(name) {
  var content = '';
  try {
    content = fs.readFileSync(name, 'utf-8');
  } catch(e) {
    console.log(e.message);
  }
  return content;
}
