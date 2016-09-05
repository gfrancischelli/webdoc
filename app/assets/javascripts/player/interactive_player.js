function WebdocPlayerView() {

    var is_playing = false;

    // Inside model, alias current_video
    var current_episode = {};

    var player = { 
        video_id: $('#player-container').data('video-id'),
        youtube: {},
        interval: {},
        current_episode: {},
        stopButtons: () => { clearInterval(this.interval) },
        activateButtons: (start_time) => { 
            let time = start_time;
            this.interval = setInterval(function() { 
              drawButtons(time);
              time += 0.5;
              }, 500);
        },
    }

    var clear_player_buttons = () => {
        $('#player-container > a').remove()
    };

    function init(new_episode) {
        console.log(`new_episode: ${new_episode}`);
        console.log(new_episode);
        current_episode = new_episode;

        youtubeGen(current_episode.url);
        init_new_post(player);

        //  Episodes menu button events
        $('.episode a').on('click', function() {
            let id = $(this).attr('data-video-id');
            clear_player_buttons();
            changeVideo(id);
        })
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

    // .js-watch ( from map menu)
    function onPlayerReady() {
        // MapController.update_watch();
    };

    // Handles button drawing functions
    // When video is playing / is not
    function onPlayerStateChange(event) {
        // 1 = Playing
        if (event.data == 1) {
            if (!is_playing) {
                const current_time = Math.floor(player.youtube.getCurrentTime()) + 1;

                $("#main-navbar").fadeToggle();
                $(".js-new-post-btn").fadeToggle();
                $(".js-alert-sign-in").fadeToggle();
                $('.new-post-form').fadeOut();
                $('.require-login').fadeOut();

                if ( newPostReceived() ){  addNewPost()  }

                is_playing = true;
                player.activateButtons(current_time);
            }
        }

        if (event.data == 2) {
            $("#videoIdInput").attr('value', current_episode.id);
            $("#fadeInInput").attr('value', Math.floor(player.youtube.getCurrentTime()));
            $("#main-navbar").fadeToggle();
            $(".js-new-post-btn").fadeToggle();
            $(".js-alert-sign-in").fadeToggle();

            is_playing = false;
            player.stopButtons();
        }
    };

    // Changes current_video from db, and load him
    function changeVideo(video_id, fade_in) {
        current_episode = PlayerController.setVideo(video_id);
        playVideoById(video_id, fade_in)
    };

    function playVideoById(video_id, fade_in) {
        player.youtube.loadVideoById(current_episode.url);
        if (fade_in) {
            player.youtube.seekTo(fade_in);
        }
    }

    // Iterate over map_posts & video_posts
    function drawButtons(current_time) {
        let time = current_time

        current_episode.video_posts
            .forEach( (post) => {
                const fade_in = post.fade_in;
                const fade_out = post.fade_out;
                const iButton_id = `iButtonVideo${post.id}`;

                // Button should exist but doesn't
                if ( !document.getElementById(iButton_id)  
                     && current_time >= fade_in
                     && current_time <= fade_out )  {
                        insertContentBtn(post);
                }
                //  Button does exist and shouldn't
                else if ( current_time < fade_in || current_time > fade_out ) {
                    $(`#${iButton_id}`).remove();
                }
            });
        
        current_episode.map_posts.forEach( (post) => {
            const fade_in = post.fade_in;
            const fade_out = post.fade_out;
            const iButton_id = `iButtonMap${post.id}`;

            if (current_time >= fade_in  &&
                current_time <= fade_out && 
               !document.getElementById(iButton_id)) {
                    console.log(`insertMapBtn`);
                    console.log(post);
                    insertMapBtn(post);
            }

            if (current_time < fade_in ||
                current_time > fade_out) {
                $(`#${iButton_id}`).remove();
            };
        });
    }


    function insertContentBtn(btn) {
        let content_btn = 
            $(`<a>${btn.title}</a>`)
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

    function insertMapBtn(post) {
        let map_btn =
            $(`<a><span class="fa fa-globe"></span></a>`)
            .addClass('content-btn js-smooth-scroll')
            .css({ 
                'top':  `${post.cooY}%`,
                'left': `${post.cooX}%`,
            })
            .attr({ 
                'id': `iButtonMap${post.id}`,
                'href': '#mapInfoDisplay',
                'data-title': post.title,
            })
            .appendTo('#player-container').fadeIn(300)
            
        map_btn.on('click', function(e) {
            player.youtube.pauseVideo();
            MapController.selectMapPost(post);
            e.stopPropagation();
        });
    }

    function addNewPost() {
        var $infos = $('#newPostReceiver');

        var new_post = {
            id:       $infos.attr('data-id'),
            title:    $infos.data('title'),
            cooX:     $infos.data('coox'),
            cooY:     $infos.data('cooy'),
            content:  $infos.data('content'),
            fade_in:  $infos.data('fade_in'),
            fade_out: $infos.data('fade_out'),
        };

        insertContentBtn(new_post);
        current_episode.video_posts.push(new_post);
    }

    function newPostReceived() {
        let data_id = $('#newPostReceiver').attr('data-id');
        let data_title = $('#newPostReceiver').data('title');

        if ( data_id != 0 ) {  return true  }
        return false 
    }

    return {
        init: init,
        clearPlayerButtons: clear_player_buttons,
        changeVideo: changeVideo,
        playVideoById: playVideoById,
    }
};

