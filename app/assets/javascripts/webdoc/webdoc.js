$(document).ready(

	// Load new interactive video
	$('.js-watch').on('click', function() {
		let video_id = this.data('video-id')
		WebdocPlayer.changeVideo(video_id)
	}


)