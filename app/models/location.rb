class Location < ActiveRecord::Base
	attr_accessible :address, :lat, :lng, :name

end
