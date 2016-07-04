class Change < ActiveRecord::Migration
  def change
  	change :map_points do |t|
  	  t.integer :lat
  	  t.integer :lng
  	end
  end
end