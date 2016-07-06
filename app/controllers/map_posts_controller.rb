class MapPostsController < ApplicationController
	before_action :set_video, only: [:index, :show]

	def index
		@map_posts = @video.map_posts.all
	end

	def show_all
		@map_posts = MapPost.all
	end

	private

	def set_video
		@video = Video.all.find(params[:video_id])
	end

end
