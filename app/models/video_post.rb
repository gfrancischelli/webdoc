class VideoPost < ActiveRecord::Base
  has_one		:map_point
  belongs_to 	:video
  belongs_to	:user
end
