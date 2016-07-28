class MapPostsController < ApplicationController
	before_action :set_video, only: [:index, :show]

	def index
		@map_posts = @video.map_posts.all
	end

	def show_all
		@map_posts = MapPost.all
	end

	def create
		@map_post = MapPost.new(map_params)

		if @map_post.save
			render js: 'create'
		else
			render js: 'failed'
		end
	end

	private

	def set_video
		@video = Video.all.find(params[:video_id])
	end

	def map_params
		params.require(:map_post).permit(:title, :content, :fade_in, :fade_out, :lat, :lng, :video_id, :cooX, :cooY)
	end
end
