class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :title
      t.string :url
      t.text :synopsis
      t.string :cover

      t.timestamps null: false
    end
  end
end
