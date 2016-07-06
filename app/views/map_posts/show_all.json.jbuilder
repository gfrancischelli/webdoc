json.array! @map_posts do |post|
	json.id 	   post.video_id
	json.url	   post.video.url
	json.title 	   post.title
	json.content   post.content
	json.fade_in   post.fade_in
	
	json.coordinates do 
		json.lat post.lat
		json.lng post.lng
	end
end

