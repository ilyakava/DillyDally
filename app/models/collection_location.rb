# == Schema Information
#
# Table name: collection_locations
#
#  id            :integer          not null, primary key
#  location_id   :integer
#  collection_id :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class CollectionLocation < ActiveRecord::Base

	attr_accessible :location_id, :collection_id

	belongs_to :location
	belongs_to :collection

end
