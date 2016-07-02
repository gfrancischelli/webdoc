class DropMapPointTable < ActiveRecord::Migration
  def change
  	drop_table :map_points
  end
end
