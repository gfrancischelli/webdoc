class MapPost < ActiveRecord::Base
  belongs_to :video
  belongs_to :user
end
