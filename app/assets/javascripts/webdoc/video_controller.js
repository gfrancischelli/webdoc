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

    function changeVideo(video_id, video_url, fade_in) {
        const video_post_url = `/videos/${video_id}/video_posts.json`;
        const   map_post_url = `/videos/${video_id}/map_posts.json`;

        player.video_id = video_id;
        console.log(`video_id: ${video_id}`)

        fetch(video_post_url)
            .then(function(response) { return response.json(); })
            .then(function(posts_json) {
                player.youtube.loadVideoById(video_url);
                current_episode.video_posts = posts_json;
            })
    };

    function alert() {
        console.log('alert player controller')
    }

    return { 
        init: init,
        load: load,
        alert, alert
    }
})();



function WebDocMapController() {

    var map_posts = []
    var MapView = WebdocMapView();

    function init() {
        console.log('iMap.init()');
        fetch('/map_posts.json')
        .then(function(response) { return response.json(); })
        .then(function(map_posts_json) {
            app.setMapPosts(map_posts_json);
            MapView.mapGen();
            marksGen();
        });
    }

    function marksGen() {
        app.getMapPosts().forEach((post) => {
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
}

var app = (function(){
    var MapController = WebDocMapController();

    var current_episode = {};
    var map_posts;

    function initDocMap() {
        MapController.init();
        console.log('MapController.init()')
    }

    function setMapPosts(posts) {
        map_posts = posts;
        console.log(map_posts);
    }

    function getMapPosts() {
        return map_posts;
    }

    return {
        getMapPosts: getMapPosts,
        setMapPosts: setMapPosts, 
        initDocMap: initDocMap,
    }
})();

function onYouTubeIframeAPIReady() {
    console.log('onYouTubeIframeAPIReady()')
    var video_id = $('#player-container').attr('data-video-id')
    console.log(`var video_id = ${video_id}`)
    PlayerController.init(video_id);
};

function initMap() {
    app.initDocMap();
};