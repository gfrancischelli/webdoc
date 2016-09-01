json.array! @map_posts do |post|
	json.title 	   post.title
	json.cover     post.cover.url
	json.content   post.content
	json.video_id  post.video_id
	json.url	   post.video.url
	json.fade_in   post.fade_in
	
	json.coordinates do 
		json.lat post.lat
		json.lng post.lng
	end
end

