class VideoPost < ActiveRecord::Base
	belongs_to 	:video
	belongs_to	:user

	validates :title, presence: true, length: { maximum: 50 }
	validates :content, presence: true
	validates :fade_in, presence: true, numericality: { only_integer: true }
	validates :fade_out, presence: true, numericality: { only_integer: true }
	validates :cooX, presence: true, numericality: { only_integer: true }
	validates :cooY, presence: true, numericality: { only_integer: true }
end
