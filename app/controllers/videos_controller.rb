class VideosController < ApplicationController
	before_action :set_video, only: [:show]

	def index
		@videos = Video.all
		@posts = VideoPost.all
	end

	def show
		@video = Video.find(params[:id])
	end

	def new
		@video = Video.new()
	end

	def create
		@video = Video.create(video_params)
	end

	private

		def set_video
			@video = Video.find(params[:id])
		end

		def video_params
			params.require(:video).permit(:title, :url)
		end
end