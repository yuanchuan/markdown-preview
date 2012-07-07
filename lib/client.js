module.exports = inject(function() {
  setInterval(function() {
    var image = new Image();
    image.src = '/get-markdown-preview-response-data';
    image = null;
  }, 2e3);
});


function inject(fn) {
  return '<script>(' + fn.toString() + ')()</script>';
}; 
 
