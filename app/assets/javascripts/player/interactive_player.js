function WebdocPlayer() {

    // DONT FORGET TO USE THIS ONE
    // var video_id = $('#player-container').data('video-id');
    var video_id = 1
    var episode = {}

    var player = { 
        playing: false,
        youtube: {},
        stop:   function stop() { clearInterval(this.interval) },
        start:  function start(start_time) { 
                    var time = start_time;
                    this.interval = setInterval( 
                        function() { 
                            updateButtons(time);
                            time ++
                            },1000)
        }
    }




    
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
                player.start(current_time);
            }
        }

        if (event.data == 2) {
            $("#main-navbar").fadeToggle()
            player.playing = false;
            player.stop()
        }
    }





    function updateButtons(current_time) {
        episode.posts.forEach(function(post) {
            var fade_in = post.fade_in;
            var fade_out = post.fade_out;

            if (current_time >= fade_in &&
                current_time <= fade_out) {
                console.log(fade_in);
            }

            if (current_time < fade_in &&
                current_time > fade_out) {
                console.log(fade_in);
            }


        });
    }




    var publicAPI = { init: init() }

    return  { publicAPI }
}




function onYouTubeIframeAPIReady() {
    console.log('onYoutubeAPIReady')
    WebdocPlayer().init()
}
