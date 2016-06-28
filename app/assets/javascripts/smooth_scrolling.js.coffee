jQuery(document).ready ->
  # Smooth Scrolling
  $(".js-smooth-scroll").on 'click', (event) ->  
    event.preventDefault()
    hash = this.hash
    $('html, body').animate
      scrollTop: $(hash).offset().top, 900,
      -> window.location.hash = hash   
    return

  $("iframe").addClass 'embed-responsive-item'
  
  