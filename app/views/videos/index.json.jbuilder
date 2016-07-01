json.array! @videos do |video|
	json.id video.id
	json.title video.title
	json.posts video.video_posts
end


