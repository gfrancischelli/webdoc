json.id		@video.id
json.title	@video.title
json.url	@video.url

json.video_posts @video.video_posts do |post|
	json.id 		post.id
	json.title 		post.title
	json.content 	post.content
	json.cooX 		post.cooX
	json.cooY  		post.cooY
	json.fade_in	post.fade_in
	json.fade_out	post.fade_out
	end
	
json.map_posts @video.map_posts do |post|
	json.id 		post.id
	json.title 		post.title
	json.content	post.content
	json.cooX 		post.cooX
	json.cooY 		post.cooY
	json.fade_in 	post.fade_in
	json.fade_out	post.fade_out
	end