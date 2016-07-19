function init_new_post(player) {

  $('.js-new-post-btn').on('click', () => {
      player.youtube.pauseVideo();
      $('.new-post-form').fadeToggle();
  });

  $('.js-new-post').on('click', () => {
    const video_id = $('#player-container').data('video-id');

    fetch(`/videos/${video_id}/video_posts/new.js`, { method: 'GET' })
    .then(function (response) { return response.text() } )
    .then(function (content) {
      console.log(content);
    });
  });
}