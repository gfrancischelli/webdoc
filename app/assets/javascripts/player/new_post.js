function init_new_post(player) {

  $('.js-new-post-btn').on('click', () => {
    player.youtube.pauseVideo();
    $('.new-post-form').fadeToggle();
  });

  $('#submitNewPost').on('click', () => {
    $('.new-post-form').fadeOut();
  });


  $('.js-alert-sign-in').on('click', () => {
    player.youtube.pauseVideo();
    $('.require-login').fadeIn();
    $('.require-login a').fadeIn();
  });
  
}

$(document).ready(function(){

});