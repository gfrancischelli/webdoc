class CreateMapPoints < ActiveRecord::Migration
  def change
    create_table :map_points do |t|
      t.string :name
      t.text :content
      t.float :lat
      t.float :lng
      t.integer :fade_in
      t.integer :fade_out
      t.references :video, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
