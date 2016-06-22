
function onYouTubeIframeAPIReady() {
  var url = "ar_VmlFKY2I";
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
