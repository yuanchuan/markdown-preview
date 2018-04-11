/**
 * Simple key-value store
 */
var R = module.exports = {
  _store: {},
  get: function(key) {
    return this._store[key];
  },
  set: function(key, val) {
    this._store[key] = val;
  },
  mset: function(map) {
    for (key in map) {
      if (map.hasOwnProperty(key)) {
        this.set(key, map[key]);
      }
    }
  }
}

R.mset({
  'port': 3333,
  'highlight': 'github',
  'width': '800',
  'marked': false,
  'stamp': +new Date(),
  'timeout': 3
});
