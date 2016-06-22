(function() {
  jQuery(document).ready(function() {
    $(".js-smooth-scroll").on('click', function(event) {
      var hash;
      event.preventDefault();
      hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function() {
        return window.location.hash = hash;
      });
    });
    return $("iframe").addClass('embed-responsive-item');
  });

}).call(this);
