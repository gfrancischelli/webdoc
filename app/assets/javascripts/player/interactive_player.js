function WebdocPlayer() {

    var video_id = $('#player-container').data('video-id');
    var player = { 
        playing: false,
        youtube: {}
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
            }
        }

        if (event.data == 2) {
            $("#main-navbar").fadeToggle()
            player.playing = false
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
