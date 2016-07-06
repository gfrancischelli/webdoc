function WebdocPlayer() {

    // DONT FORGET TO USE THIS ONE
    // var video_id = $('#player-container').data('video-id');
    var video_id = 1

    const player = { 
        youtube: {},
        playing: false,
        interval: {},
        current_episode: {},
        stopButtons:  function stop() { clearInterval(this.interval) },
        activateButtons:  function start(start_time) { 
                    let time = start_time;
                    this.interval = setInterval(function() { 
                            drawButtons(time);
                            time ++
                            },1000)
        },
    }

    // episode = ~rb~Video.find(video_id)
    // video_id = closure #player-container
    function init() {
        fetch(`/videos/${video_id}.json`)
            .then(function(response) { return response.json(); })
            .then(function(episode) {
                player.current_episode = episode;
                console.log(player.current_episode.url)
                youtubeGen(player.current_episode.url)
            });
    }

    // onPlayerReady: Add onClick to .js-watch
    // onPlayerStateChange: Handles button drawing
    function youtubeGen(url) {
        player.youtube = new YT.Player('youtube', {
            videoId: url,
            playerVars: { fs: false },
            events: {
            'onReady': onPlayerReady, 
            'onStateChange': onPlayerStateChange,
            }
        });
    }

    // .js-watch events
    function onPlayerReady() {
        $('.js-watch').on('click', function() {
            button = $(this);
            var fade_in   = button.data('fadeIn');
            var video_id  = button.data('videoId');
            var video_url = button.data('videoUrl');

            changeVideo(video_id, video_url, fade_in);
        })
    }

    // Handles button drawing functions
    function onPlayerStateChange(event) {
        if (event.data == 1) {
            if (!player.playing) {
                $("#main-navbar").fadeToggle();
                player.playing = true;
                current_time = player.youtube.getCurrentTime();
                player.activateButtons(current_time);
            }
        }

        if (event.data == 2) {
            $("#main-navbar").fadeToggle()
            player.playing = false;
            player.stopButtons();
        }
    }

    // Fetches new video into player.current_episode
    // Load new player.youtube
    function changeVideo(video_id, video_url, fade_in) {
        let video_post_url = `/videos/${video_id}/video_posts.json`
        let   map_post_url = `/videos/${video_id}/map_posts.json`

        fetch(video_post_url)
            .then(function(response) { return response.json(); })
            .then(function(posts_json) {
                player.youtube.loadVideoById(video_url);
                player.current_episode.video_posts = posts_json;
            })
    }





    // TODO join map_posts + video_posts
    function drawButtons(current_time) {
        let posts = []
        player.current_episode.posts.forEach(function(post) {
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







    const publicAPI = { 
        init: init(), 
        changeVideo: changeVideo(),
    }

    return  { publicAPI }
}




function onYouTubeIframeAPIReady() {
    console.log('onYoutubeAPIReady')
    WebdocPlayer().init()
}

