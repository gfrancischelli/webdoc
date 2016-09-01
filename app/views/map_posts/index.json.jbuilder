json.array! @map_posts do |post|
	json.title 	   post.title
	json.content   post.content
	json.fade_in   post.fade_in
	json.fade_out  post.fade_out
	json.video_id  post.video_id
	
	json.coordinates do 
		json.lat post.lat
		json.lng post.lng
	end
end

