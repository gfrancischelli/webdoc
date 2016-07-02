class CreateMapPosts < ActiveRecord::Migration
  def change
    create_table :map_posts do |t|
      t.string :title
      t.text :content
      t.integer :cooX
      t.integer :cooY
      t.integer :fade_in
      t.integer :fade_out
      t.float :lat
      t.float :lng
      t.references :video, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
