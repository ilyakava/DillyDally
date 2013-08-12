class LocationTag < ActiveRecord::Base

	attr_accessible :tag_id, :location_id

	belongs_to :tag
	belongs_to :location

end
