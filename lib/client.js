module.exports = inject(function() {
  window.onbeforeunload = function() {
    document.write('<script src="/close"><\/script>');
  }
});


function inject(fn) {
  return '<script>(' + fn.toString() + ')()</script>';
}; 
 
