function init_new_post(player) {

  $('.js-new-post-btn').on('click', () => {
      player.youtube.pauseVideo();
      $('.new-post-form').fadeToggle();
  });

  $('#submitNewPost').on('click', () => {
    $('.new-post-form').fadeOut();
  })
}

$(document).ready(function(){

});