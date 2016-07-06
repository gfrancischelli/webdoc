class VideoPostsController < ApplicationController
	before_action :set_video, only: [:index, :show]

	def index
		@video_posts = @video.video_posts.all
	end

	private

	def set_video
		@video = Video.all.find(params[:video_id])
	end
end
