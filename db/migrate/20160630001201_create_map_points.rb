class CreateMapPoints < ActiveRecord::Migration
  def change
    create_table :map_points do |t|
      t.string :lat
      t.string :lng
      t.references :video_post, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
