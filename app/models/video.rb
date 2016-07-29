class Video < ActiveRecord::Base

	has_many :map_posts
	has_many :video_posts

	mount_uploader :cover, CoverUploader
	
end
