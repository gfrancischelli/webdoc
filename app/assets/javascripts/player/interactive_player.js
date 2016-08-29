function WebdocPlayerView() {

    // DONT FORGET TO USE THIS ONE
    // var video_id = $('#player-container').data('video-id');
    // let video_id = 1;
    var is_playing = false;
    var current_episode = {};

    var player = { 
        video_id: $('#player-container').data('video-id'),
        youtube: {},
        interval: {},
        current_episode: {},
        stopButtons: () => { 
            clearInterval(this.interval);
            console.log('stopInterval');
             },
        activateButtons: (start_time) => { 
            let time = start_time;
            this.interval = setInterval(function() { 
              console.log(time);
              drawButtons(time);
              time += 0.5;
              }, 500);
        },
    }


    // episode = ~rb~Video.find(video_id)
    // video_id = closure #player-container
    function init(new_episode) {
        console.log('Player.init()')
        console.log(new_episode)

        youtubeGen(new_episode.url);
        init_new_post(player);
        
        current_episode = new_episode;

        $('.episode a').on('click', function() {
            console.log('changeVideo() pls');
            $('#player-container > a').remove();
            var id = $(this).attr('data-video-id');
            var video_url = $(this).attr('data-video-url');

            console.log(`changeVideo(${id})`);
            console.log(`database.find(${id}): ${database.find(id).title}`)
            current_episode = database.setCurrentVideo(database.find(id));

            console.log(`current_episode = ${current_episode}`)
            player.youtube.loadVideoById(video_url);
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

    // .js-watch events
    function onPlayerReady() {
        $('.js-watch').on('click', function() {
            let button = $(this);
            let fade_in   = button.data('fadeIn');
            let video_id  = button.data('videoId');

            // changeVideo(video_id, video_url, fade_in);
            changeVideo(video_id, fade_in);
        });
    };

    // Handles button drawing functions
    // When video is playing / is not
    function onPlayerStateChange(event) {
        if (event.data == 1) {
            if (!is_playing) {
                const current_time = Math.floor(player.youtube.getCurrentTime()) + 1;
                // Hide every player overlay
                $("#main-navbar").fadeToggle();
                $(".js-new-post-btn").fadeToggle();
                $('.new-post-form').fadeOut();

                if (newPostReceived()) {
                    console.log('received')
                    addNewPost();
                }

                is_playing = true;
                
                player.activateButtons(current_time);
            }
        }

        if (event.data == 2) {

            console.log(`current_episode.id: ${current_episode.id}`);
            $("#videoIdInput").attr('value', current_episode.id);
            $("#fadeInInput").attr('value', Math.floor(player.youtube.getCurrentTime()));
            $("#main-navbar").fadeToggle();
            $(".js-new-post-btn").fadeToggle();

            is_playing = false;
            player.stopButtons();
        }
    };

    // Fetches new video into current_episode
    // Load new player.youtube
    function changeVideo(video_id) {
        current_video = database.find(video_id);
        database.setCurrentVideo(current_video);
        player.youtube.loadVideoById(current_video.url);
    };


    // Iterate over map_posts & video_posts
    // Draw and remove on exact time
    function drawButtons(current_time) {
        let time = current_time

        current_episode.video_posts.forEach( (post) => {
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
            .addClass('content-btn')
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
            
        map_btn.on('click', () => {
                player.youtube.pauseVideo();
                updateMapMenu(post);
                console.log('update?')
            });
    }

    function updateMapMenu(post) {
        $('#markTitle').text(post.title);
        $('#markContent').html(post.content);
        // $('#markCover').attr('src', post.cover);
        $('.js-watch')
            .attr({
              "data-fade-in":   post.fade_in,
              "data-video-id":  post.id,
              "data-video-url": post.url,
            }); 
        $('#mapInfoDisplay *:hidden').hide().removeClass('hidden').fadeIn(650);
        console.log('finish updatemapmenu')
    };

    function addNewPost() {
        var $infos = $('#newPostReceiver');
        var id = $infos.attr('data-id');
        var title = $infos.data('title');
        var cooX = $infos.data('coox');
        var cooY = $infos.data('cooy');
        var content = $infos.data('content');
        var fade_in = $infos.data('fade_in');
        var fade_out = $infos.data('fade_out');

        var new_post = {
            id:       id,
            title:    title,
            cooX:     cooX,
            cooY:     cooY,
            content:  content,
            fade_in:  fade_in,
            fade_out: fade_out,
        };

        insertContentBtn(new_post);

        current_episode.video_posts.push(new_post);
    }

    function newPostReceived() {
        let data_id = $('#newPostReceiver').attr('data-id');
        let data_title = $('#newPostReceiver').data('title');
        if (data_id != 0) { return true }
        else { return false }
    }


    return {
        init: init
    }
};

