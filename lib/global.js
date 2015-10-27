var Redis = require('@yuanchuan/redis-commands');
var R = module.exports = new Redis();

R.mset(
  'port', 3333,
  'highlight', 'github',
  'marked', false,
  'stamp', +new Date()
);
