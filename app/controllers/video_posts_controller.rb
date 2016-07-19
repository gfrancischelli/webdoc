class VideoPostsController < ApplicationController
	before_action :set_video, only: [:index, :show, :new]
	protect_from_forgery except: :new

	def index
		@video_posts = @video.video_posts.all
	end

	def new
		@video_post = VideoPost.new
	end

	def show
	end

	def create
		@video_post = VideoPost.create(video_post_params)
		@video_post.fade_out = @video_post.fade_in + 8
		@video_post.cooX = 70
		@video_post.cooY = 20
		@video_post.save
		
		render json: @video_post
	end

	private

	def set_video
		@video = Video.all.find(params[:video_id])
	end

	def video_post_params
	  params.require(:video_post).permit(:title, :content, :fade_in, :fade_out, :video_id, :user_id)
	end

end
