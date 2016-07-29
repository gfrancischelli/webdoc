class AddCoverToMapPosts < ActiveRecord::Migration
  def change
    add_column :map_posts, :cover, :string
  end
end
