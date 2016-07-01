class ChangeMapPointLat < ActiveRecord::Migration
  def change
  	execute 'ALTER TABLE map_points ALTER COLUMN lat TYPE integer USING (lat::integer)'
  	execute 'ALTER TABLE map_points ALTER COLUMN lng TYPE integer USING (lng::integer)'
  end
end
