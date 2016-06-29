
function onYouTubeIframeAPIReady() {
  var url =  $('#player-container').data('video-url')
  var player;
  player = new YT.Player('youtube', {
    videoId: url,
    playerVars: {
      fs: false },
    events: {
      //  Relative to PLAYER BUTTONS -------
      // 'onReady': onPlayerReady,
      'onStateChange':  window.onPlayerStateChange
    }
  });
}
