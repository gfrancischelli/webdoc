class AddFadeOutToVideoPost < ActiveRecord::Migration
  def change
    add_column :video_posts, :fade_out, :integer
  end
end
