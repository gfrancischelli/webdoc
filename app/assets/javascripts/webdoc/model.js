var database = (function () {
 
	var videos = [];
	var current_video;
	var next_video;
	var next_video_fade_in;
 
	var init = function () {
		console.log('init model')
		fetch(`/videos.json`)
		    .then(function(response) { return response.json() })
		    .then(function(all_episodes_json) {
		        videos = (all_episodes_json);
		        console.log('model done loading');
		    })
	}

	function addVideo(new_video) {
		for (var i = videos.length - 1; i >= 0; i--) {
			if (videos[i].id = new_video.id) {
				return 0
			}
		}
		videos.push(new_video);
		return 1
	}

	// Find and return video[id], null or undefined
	function find(id) {
		var result  = videos.filter((video) => video.id == id );
        return result? result[0] : null;
	}
 
 	function getCurrentVideo() {
 		return current_video
 	}

 	function setCurrentVideo(video){
 		current_video = video;
 		return current_video
 	}

 	function queueVideoByID(id, fade_in) {
 		next_video = find(id);
 		next_video_fade_in = fade_in;
 		return next_video
 	}

 	function getNextVideo() {
 		return next_video
 	}

 	function getQueueTime() {
 		return next_video_fade_in
 	}

    return {
    	getCurrentVideo: getCurrentVideo,
     	setCurrentVideo: setCurrentVideo,
    	queueVideoByID: queueVideoByID,
    	getQueueTime: getQueueTime,
    	getNextVideo: getNextVideo,
		addVideo: addVideo,
		init: init,
		find: find,
    };
})();

var Observer = (function(){

})();

database.init()