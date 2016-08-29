var database = (function () {
 
	var videos = [];
	var current_video;
 
	var init = function () {
		console.log('init model')
		fetch(`/videos.json`)
		    .then(function(response) { return response.json() })
		    .then(function(all_episodes_json) {
		        videos = (all_episodes_json);
		        console.log('model done loading');
		    })
	}
	
	// Singleton

	// Private methods and variables

	function addVideo(new_video) {
		for (var i = videos.length - 1; i >= 0; i--) {
			if (videos[i].id = new_video.id) {
				return 0
			}
		}
		videos.push(new_video);
		return 1
	}

	function find(id) {
		console.log(`find(${id})`)
		var result  = videos.filter((video) => video.id == id );
		console.log(result);
        return result? result[0] : null; // or undefined
	}
 
	 
   // Public methods and variables //////////////////////////
    return {
      getCurrentVideo: function() {
        return current_video;
      },

      setCurrentVideo(video) {
      	current_video = video;
      	return current_video
      },

      addVideo: addVideo,
      init: init,
      find: find,

    };
})();

var Observer = (function(){

})();

database.init()