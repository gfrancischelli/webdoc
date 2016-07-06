json.array! @video_posts do |post|
	json.id 		post.video_id
	json.title 		post.title
	json.content 	post.content
	json.fade_in 	post.fade_in
	json.fade_out	post.fade_out
end

