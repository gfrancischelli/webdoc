function WebdocPlayer() {

    // DONT FORGET TO USE THIS ONE
    var video_id = $('#player-container').data('video-id');
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

    // episode = ~rb~Video.find(video_id)
    // video_id = closure #player-container
    function init() {
        console.log('init ${video_id}');
        fetch('/videos/' + video_id + '.json')
            .then(function(response) { return response.json(); })
            .then(function(episode_json) {
                episode = episode_json;
                youtubeGen(episode.url)
            });
    }

    function youtubeGen(url) {
        player.youtube = new YT.Player('youtube', {
            videoId: url,
            playerVars: { fs: false },
            events: {
            //  Relative to PLAYER BUTTONS -------
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            }
        });
    }

    function onPlayerReady() {
        $('.js-watch').on('click', function() {
            button = $(this);

            var fade_in   = button.data('fadeIn');
            var video_id  = button.data('videoId');
            var video_url = button.data('videoUrl');

            changeVideo(video_id, video_url, fade_in);
        })
    }

    function onPlayerStateChange(event) {
        if (event.data == 1) {
            if (!player.playing) {
                $("#main-navbar").fadeToggle();
                player.playing = true;
                current_time = player.youtube.getCurrentTime();
                player.start(current_time);
            }
        }

        if (event.data == 2) {
            $("#main-navbar").fadeToggle()
            player.playing = false;
            player.stop();
        }
    }

    function changeVideo(video_id, video_url, fade_in) {
        let video_post_url = `/videos/${video_id}/video_posts.json`
        let   map_post_url = `/videos/${video_id}/map_posts.json`

        fetch(video_post_url)
            .then(function(response) { return response.json();})
            .then(function(video_posts_json) {
                video_posts = video_posts_json;

                player.youtube.loadVideoById(video_url);
            })
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
