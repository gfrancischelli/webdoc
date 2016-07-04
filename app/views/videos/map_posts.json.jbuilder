json.array! @map_posts do |post|
	json.id post.video_id
	json.title post.title
	json.content post.content
	json.coordinates do 
		json.lat post.lat
		json.lng post.lng
	end
end

