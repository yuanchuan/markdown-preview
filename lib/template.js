exports.render = function(map) {
 
  var template = [
        '<!doctype html>'
      , '<html>'
      , '<head>'
      ,   '<title>{{ title }}</title>'
      , '</head>'
      , '<body>'
      ,   '{{ body }}'
      , '</body>'
      , '</html>'
  ].join('');       
          
  map && Object.keys(map).forEach(function(key){
    var reg = new RegExp("{{\\s*" + key + "\\s*}}", "g");
    template = template.replace(reg, map[key]);
  });

  return template + require('./client');

};


