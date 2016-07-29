class VideosController < ApplicationController
	before_action :set_video, only: [:show, :edit, :update, :destroy]

	def index
		@videos = Video.all
		@posts = VideoPost.all
	end

	def show
	end

	def edit
	end

	def new
		@video = Video.new()
		@map_post = MapPost.new()
		@video_post = VideoPost.new()
	end

	def create
		@video = Video.create(video_params)
	end

	def update
		@video.update(video_params)
		redirect_to videos_path
	end

	def destroy
		@video_posts = VideoPost.where(video_id: @video.id)
		@video_posts.each do |post|
		  post.destroy
		end
		
		@map_posts = MapPost.where(video_id: @video.id)
		@map_posts.each do |post|
		  post.destroy
		end

		@video.destroy
		redirect_to videos_path
	end

	private

		def set_video
			@video = Video.find(params[:id])
		end

		def video_params
			params.require(:video).permit(:title, :url, :cover)
		end
end