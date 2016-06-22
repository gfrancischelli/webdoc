(function() {
  window.onPlayerStateChange = function(event) {
    if (event.data === 1) {
      if (!window.playing) {
        $("#main-navbar").fadeToggle();
        window.playing = true;
      }
    }
    if (event.data === 2) {
      $("#main-navbar").fadeToggle();
      window.playing = false;
    }
  };

}).call(this);
