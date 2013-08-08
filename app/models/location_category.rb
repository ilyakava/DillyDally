# == Schema Information
#
# Table name: location_categories
#
#  id          :integer          not null, primary key
#  location_id :integer
#  category_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#

class LocationCategory < ActiveRecord::Base

	attr_accessible :location_id, :category_id

	belongs_to :location
	belongs_to :category


end
