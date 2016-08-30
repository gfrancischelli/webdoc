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