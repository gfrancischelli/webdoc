class VideosController < ApplicationController
	before_action :set_video, only: [:show]

	def index
		@videos = Video.all
		@posts = VideoPost.all
	end

	def show
		@video = Video.find(params[:id])
	end

	def map_posts
		@map_posts = MapPost.all
	end

	private

		def set_video
			@video = Video.find(params[:id])
		end

end