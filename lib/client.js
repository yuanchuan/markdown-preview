
/**
 * JSONP polling at client side.
 */
module.exports = inject(function() {

  (window.mp = {
      init: function() {
        setInterval(function() {
          var url = '/jsonp-request?callback=mp.jsonpCallback&s='+(+new Date());
          mp.injectScript(url);
        }, 1e3);
      }
    , injectScript: function(src) {
        var stag = document.createElement('script');
        stag.src = src;
        document.body.appendChild(stag);
        setTimeout(function() {
          stag.parentNode.removeChild(stag);
        }, 1e3);
      }
    , updateClient: function(html) {
        window.location.reload();
      }
    , jsonpCallback: function(stamp, html) {
        this.localStamp || (this.localStamp = stamp);
        if (this.localStamp < stamp) {
          this.localStamp = stamp;
          this.updateClient(html);
        }
      }
  }).init();

});



/**
 * For writing client javascript more straightly.
 *
 * @param {Function} fn
 * @api private
 */
function inject(fn) {
  return (
      '<script>('
    + fn.toString()
    + ')()</script>'
  );
};

