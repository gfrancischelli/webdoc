var PlayerController = (function() {

    var episode = {};
    var PlayerView = WebdocPlayerView();

    function init(video_id) {
        fetch(`/videos/${video_id}.json`)
            .then(function(response) { return response.json() })
            .then(function(episode_json) {
                database.setCurrentVideo(episode_json);
                PlayerView.init(episode_json);
                console.log(`PlayerView.init(${episode_json.title})`)
            });
    }

    function load(video_id) {
        fetch(`/videos/${video_id}.json`)
            .then(function(response) { return response.json() })
            .then(function(episode_json) {
                episode = episode_json;
                return episode;
            });
    };

    return { 
        init: init,
        load: load,
    }
})();



var MapController = (function() {

    var map_posts = []
    var MapView = WebdocMapView();

    function init() {
        console.log('iMap.init()');
        fetch('/map_posts.json')
        .then(function(response) { return response.json(); })
        .then(function(map_posts_json) {
            map_posts = map_posts_json;
            MapView.mapGen();
            marksGen();
        });
    }

    function marksGen() {
        map_posts.forEach((post) => {
            mark = MapView.drawMark(post);
            mark.addListener('click', function() {
                console.log('//updatemapmenu');
                MapView.updateMapMenu(post);
            });
        })
    }

    return {
        init: init
    }
})();

function onYouTubeIframeAPIReady() {
    var video_id = $('#player-container').attr('data-video-id')
    PlayerController.init(video_id);
};

function initMap() {
    MapController.init();
};


    // function changeVideo(video_id, video_url, fade_in) {
    //     const video_post_url = `/videos/${video_id}/video_posts.json`;
    //     const   map_post_url = `/videos/${video_id}/map_posts.json`;

    //     player.video_id = video_id;
    //     console.log(`video_id: ${video_id}`)

    //     fetch(video_post_url)
    //         .then(function(response) { return response.json(); })
    //         .then(function(posts_json) {
    //             player.youtube.loadVideoById(video_url);
    //             current_episode.video_posts = posts_json;
    //         })
    // };
