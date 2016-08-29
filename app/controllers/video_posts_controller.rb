class VideoPostsController < ApplicationController
	before_action :set_video, only: [:index, :show, :new]
	protect_from_forgery except: :new

	def index
		@video_posts = @video.video_posts.all
	end

	def new
		@video_post = @video.video_posts.new
	end

	def show
	end

	def edit
		@video_post = VideoPost.find(params[:video_id])
	end

	def create
		@video_post = VideoPost.new(video_post_params)
		@video_post.fade_out = @video_post.fade_in + 8
		@video_post.cooX = 70
		@video_post.cooY = 20
		@video_post.save!

		@post = @video_post
	end

	def create_alt
		@video_post = VideoPost.create(video_post_params)
		redirect_to videos_path
	end

	def destroy
		@video_post = Video.find(params[:id]).video_posts.find(params[:video_id])
		@video_post.destroy
		redirect_to videos_path
	end

	def update
		VideoPost.find(params[:video_id]).update(video_post_params)
		redirect_to videos_path
	end

	private

	def set_video
		@video = Video.find(params[:video_id])
	end

	def video_post_params
	  params.require(:video_post).permit(:title, :content, :fade_in, :fade_out, :video_id, :user_id, :cooX, :cooY)
	end

end
