var PlayerController = (function() {

    var episode = {};
    var PlayerView = WebdocPlayerView();

    function init(video_id) {
        fetch(`/videos/${video_id}.json`)
            .then(function(response) { return response.json() })
            .then(function(episode_json) {
                PlayerView.init(episode_json);
                database.setCurrentVideo(episode_json);
                console.log(`PlayerView.init(${episode_json.title})`)
        });

    }

    function playNextVideo(){
        const video = database.setCurrentVideo(database.getNextVideo());
        const fade_in = database.getQueueTime()
        PlayerView.clearPlayerButtons();
        PlayerView.changeVideo(video.id, fade_in);
        console.log('playNextVideo()', video)
    }

    function setVideo(video_id) {
        console.log(database.setCurrentVideo(database.find(video_id)))
        return database.setCurrentVideo(database.find(video_id));

    }

    return { 
        init: init,
        setVideo: setVideo,
        playNextVideo: playNextVideo,
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

        $('.js-map-watch').on('click', function() {
            PlayerController.playNextVideo();
        })
    }

    function marksGen() {
        for (let i = 0; i < map_posts.length; i++) {
            let post = map_posts[i];
            mark = MapView.drawMark(post);
            mark.addListener('click', function() {
                selectMapPost(post);
            });
        }
    }

    function selectMapPost(post) {
        console.log('selectMapPost', post)
        MapView.render(post);
        database.queueVideoByID(post.video_id, post.fade_in);
    }

    return {
        init: init,
        selectMapPost: selectMapPost,
    }
})();

function onYouTubeIframeAPIReady() {
    var video_id = $('#player-container').attr('data-video-id')
    PlayerController.init(video_id);
};

function initMap() {
    MapController.init();
};