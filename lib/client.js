module.exports = inject(function() {
  function responding() {
    var image = new Image();
    image.src = '/get-markdown-preview-response-data';
    image = null;     
  };
  responding(), setInterval(responding, 2e3);
});


function inject(fn) {
  return '<script>(' + fn.toString() + ')()</script>';
}; 
 
