# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Tag < ActiveRecord::Base
	attr_accessible :name

	has_many :location_tags
	has_many :locations, through: :location_tags, source: :location

end
