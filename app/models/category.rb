# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Category < ActiveRecord::Base

	attr_accessible :name

	has_many :location_categories
	has_many :locations, through: :location_categories
	
end
