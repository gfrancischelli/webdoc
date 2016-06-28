class CreateVideoPosts < ActiveRecord::Migration
  def change
    create_table :video_posts do |t|
      t.string :title
      t.text :content
      t.integer :cooX
      t.integer :cooY
      t.integer :fade_in
      t.references :video, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
