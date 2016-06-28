class Video < ActiveRecord::Base

	has_many :map_points
	has_many :video_posts
	
end
