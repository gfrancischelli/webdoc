function WebdocPlayer() {

    // DONT FORGET TO USE THIS ONE
    // var video_id = $('#player-container').data('video-id');
    let video_id = 1;

    const player = { 
        youtube: {},
        playing: false,
        interval: {},
        current_episode: {},
        stopButtons: () => { clearInterval(this.interval); },
        activateButtons: (start_time) => { 
            let time = start_time;
            this.interval = setInterval(function() { 
              drawButtons(time);
              time += 0.5;
              }, 500);
        }
}

    // episode = ~rb~Video.find(video_id)
    // video_id = closure #player-container
    function init() {
        fetch(`/videos/${video_id}.json`)
            .then(function(response) { return response.json() })
            .then(function(episode) {
                player.current_episode = episode;
                youtubeGen(player.current_episode.url);
            });
    };

    // onPlayerReady: Add onClick to .js-watch
    // onPlayerStateChange: Handles button drawing
    function youtubeGen(url) {
        player.youtube = new YT.Player('youtube', {
            videoId: url,
            playerVars: { fs: false },
            events: {
            'onReady': onPlayerReady, 
            'onStateChange': onPlayerStateChange
            }
        });
    };

    // .js-watch events
    function onPlayerReady() {
        $('.js-watch').on('click', function() {
            let button = $(this);
            let fade_in   = button.data('fadeIn');
            let video_id  = button.data('videoId');
            let video_url = button.data('videoUrl');

            changeVideo(video_id, video_url, fade_in);
        });
    };

    // Handles button drawing functions
    // When video is playing / is not
    function onPlayerStateChange(event) {
        if (event.data == 1) {
            if (!player.playing) {
                $("#main-navbar").fadeToggle();
                player.playing = true;
                
                const current_time = Math.floor(player.youtube.getCurrentTime()) + 1;
                player.activateButtons(current_time);
            }
        }

        if (event.data == 2) {
            $("#main-navbar").fadeToggle();
            player.playing = false;
            player.stopButtons();
        }
    };

    // Fetches new video into player.current_episode
    // Load new player.youtube
    function changeVideo(video_id, video_url, fade_in) {
        const video_post_url = `/videos/${video_id}/video_posts.json`;
        const   map_post_url = `/videos/${video_id}/map_posts.json`;

        fetch(video_post_url)
            .then(function(response) { return response.json(); })
            .then(function(posts_json) {
                player.youtube.loadVideoById(video_url);
                player.current_episode.video_posts = posts_json;
            })
    };




    // Iterate over map_posts & video_posts
    // Draw and remove on exact time
    function drawButtons(current_time) {
        let time = current_time

        player.current_episode.video_posts.forEach( (post) => {
            const fade_in = post.fade_in;
            const fade_out = post.fade_out;
            const iButton_id = `iButtonVideo${post.id}`;

            if (current_time >= fade_in  &&
                current_time <= fade_out  &&
               !document.getElementById(iButton_id)) {
                    insertContentBtn(post);
            }

            if (current_time < fade_in ||
                current_time > fade_out) {
                $(`#${iButton_id}`).remove();
            };
        });
        
        player.current_episode.map_posts.forEach( (post) => {
            const fade_in = post.fade_in;
            const fade_out = post.fade_out;
            const iButton_id = `iButtonMap${post.id}`;

            if (current_time >= fade_in  &&
                current_time <= fade_out && 
               !document.getElementById(iButton_id)) {
                    insertMapBtn(post);
            }

            if (current_time < fade_in ||
                current_time > fade_out) {
                $(`#${iButton_id}`).remove();
            };
        });
    }


    function insertContentBtn(btn) {
      let content_btn = $(`<a>${btn.title}</a>`)
        .addClass('content-btn')
        .css({ 
            'top':  `${btn.cooY}%`, 
            'left': `${btn.cooX}%`, 
        })
        .attr({ 
            'id': `iButtonVideo${btn.id}`,
            'data-toggle': 'modal',
            'data-target': '#playerModal',
        })
        .appendTo('#player-container').fadeIn(300)
      
      content_btn.on('click', () => {
        player.youtube.pauseVideo();
        $('#modalTitle').html(btn.title);
        $('#modalBody').html(btn.content);
        });
    };


    function insertMapBtn(btn) {
        console.log(btn);
        let map_btn =
            $(`<a><span class="glyphicon glyphicon-globe"></span>${btn.title}</a>`)
            .addClass('content-btn')
            .css({ 
                'top':  `${btn.cooY}%`,
                'left': `${btn.cooX}%`,
            })
            .attr({ 
                'id': `iButtonMap${btn.id}`,
                'href': '#mapInfoDisplay',
                'data-title': btn.title,
            })
            .appendTo('#player-container').fadeIn(300)
            .on('click', () => {
                updateMapMenu(btn);
                player.youtube.pauseVideo();
            });
    }

    function updateMapMenu(post) {
        $('#markTitle').text(post.title);
        $('#markContent').html(post.content);
        $('.js-watch')
            .attr({
              "data-fade-in":   post.fade_in,
              "data-video-id":  post.id,
              "data-video-url": post.url,
            }); 

        $('#mapInfoDisplay *:hidden').hide().removeClass('hidden').fadeIn(650);
    };



    var publicAPI = {
        init: init(), 
        changeVideo: changeVideo(),
    };

    return  { publicAPI };
};




function onYouTubeIframeAPIReady() {
    console.log('onYoutubeAPIReady');
    WebdocPlayer().init();
};

