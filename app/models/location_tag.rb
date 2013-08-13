class LocationTag < ActiveRecord::Base

	attr_accessible :tag_id, :location_id, :user_id

	belongs_to :tag
	belongs_to :location

	validates_uniqueness_of :tag_id, scope: :location_id

end
