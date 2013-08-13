# == Schema Information
#
# Table name: collections
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  user_id    :integer
#

class Collection < ActiveRecord::Base
	attr_accessible :name, :user_id
	
	has_many :collection_locations
	has_many :locations, through: :collection_locations, source: :location

	belongs_to :user

end
