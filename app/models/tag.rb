class Tag < ActiveRecord::Base
	attr_accessible :name

	has_many :location_tags
	has_many :locations, through: :location_tags, source: :location

end
