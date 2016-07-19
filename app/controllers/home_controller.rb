class HomeController < ApplicationController
	
	def index
		@videos = Video.all
	end

	def new
		@video_post = VideoPost.new
	end
end
