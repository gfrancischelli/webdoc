function VideoController() {

    var episode = {};

    function init() {
        console.log('Video.init()');
    };

    function load(video_id) {
        fetch(`/videos/${video_id}.json`)
            .then(function(response) { return response.json() })
            .then(function(episode_json) {
                episode = episode_json;
            });
        return episode;
    };

    return { 
        init: init,
        load: load,
    }
};

var app = (function(){
    var iMap = WebdocMap();
    var Player = WebdocPlayer();
    var Video = VideoController();

    var is_ready = false;
    var video_id = 1;
    var episode = {hey: 'hey'};

    function init() {
        loadEpisode(video_id);
    }

    function ready() {
        return is_ready
    }

    function loadEpisode(video_id) {
        episode = Video.load(video_id);
        is_ready = true;
    }

    function initPlayer() {
        fetch(`/videos/${video_id}.json`)
            .then(function(response) { return response.json() })
            .then(function(episode_json) {
                episode = episode_json;
                Player.init(episode);
            });
    }

    var publicApi = {
        ready: ready,
        initPlayer: init,
        loadEpisode: loadEpisode,
    }

    return { publicApi }
})();

var teste = (function(){
    var iMap = WebdocMap();
    var Video = VideoController();
    var Player = WebdocPlayer();

    var episode = {};

    var name = 'nomedejesus';

    function initDocMap() {
        iMap.init();
    }

    function initPlayer(video_id) {
        fetch(`/videos/${video_id}.json`)
            .then(function(response) { return response.json() })
            .then(function(episode_json) {
                episode = episode_json;
                Player.init(episode);
            });
    }

    return { 
        initDocMap: initDocMap,
        initPlayer: initPlayer,
    }
})();

function onYouTubeIframeAPIReady() {
    console.log('onYouTubeIframeAPIReady()')
    var video_id = $('#player-container').attr('data-video-id')
    teste.initPlayer(video_id);
};

function initMap() {
    console.log('initMap()')
    teste.initDocMap();
};