function WebdocPlayer() {

    var video_id = $('#player-container').data('video-id');
    var player = { 
        playing: false,
        youtube: {},
        start:  function start() {
                    this.interval = setInterval(function(){
                    console.log('interval');
                    },1000)
                },
        stop:   function stop() { clearInterval(this.interval) }
    }

    var episode = {}

    function init() {
        console.log('init');
        fetch('/videos/' + video_id + '.json')
            .then(function(response) { return response.json(); })
            .then(function(episode_json) {
                episode = episode_json;
                console.log(episode)
                youtubeGen(episode.url)
            });
    }

    function youtubeGen(url) {
        player.youtube = new YT.Player('youtube', {
            videoId: url,
            playerVars: { fs: false },
            events: {
            //  Relative to PLAYER BUTTONS -------
            // 'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerStateChange(event) {
        if (event.data == 1) {
            if (!player.playing) {
                $("#main-navbar").fadeToggle()
                player.playing = true

                current_time = player.youtube.getCurrentTime();
                console.log(current_time);
                player.start();
            }
        }

        if (event.data == 2) {
            $("#main-navbar").fadeToggle()
            player.playing = false;
            player.stop()
        }
    }


    var publicAPI = {
        init: init()
    }

    return { publicAPI }
}


function onYouTubeIframeAPIReady() {
    console.log('onYoutubeAPIReady')
    WebdocPlayer().init()
}
