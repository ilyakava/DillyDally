class UserLocation < ActiveRecord::Base
	attr_accessible :user_id, :location_id

	belongs_to :user
	belongs_to :location

end
