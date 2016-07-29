class MapPostsController < ApplicationController
	before_action :set_video, only: [:index, :show, :new, :create]

	def index
		@map_posts = @video.map_posts.all
	end

	def new
		@map_post = @video.map_posts.new
	end

	def show_all
		@map_posts = MapPost.all
	end

	def create
		@map_post = @video.map_posts.create(map_params)
		redirect_to videos_path
	end

	def edit
		@map_post = MapPost.find(params[:video_id])
	end

	def update
		MapPost.find(params[:video_id]).update(map_params)
		redirect_to videos_path
	end

	def destroy
		@map_post = Video.find(params[:id]).map_posts.find(params[:video_id])
		@map_post.destroy
		redirect_to videos_path
	end

	private

	def set_video
		@video = Video.find(params[:video_id])
	end

	def map_params
		params.require(:map_post).permit(:title, :content, :fade_in, :fade_out, :video_id, :lat, :lng, :cooX, :cooY)
	end
end
