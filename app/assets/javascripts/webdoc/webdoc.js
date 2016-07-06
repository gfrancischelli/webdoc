$(document).ready(

	// Load new interactive video
	$('.js-watch').on('click', function() {
		let fade_in   = this.data('fade_in');
		let video_id  = this.data('video-id');
		let video_url = this.data('video-url');

		WebdocPlayer.changeVideo(video_id)
	}

)
