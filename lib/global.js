var Redis = require('redis-commands');
var R = module.exports = new Redis();

R.mset(
  'port', 3333,
  'stamp', +new Date()
);
