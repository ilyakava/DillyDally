# == Schema Information
#
# Table name: location_tags
#
#  id          :integer          not null, primary key
#  location_id :integer
#  tag_id      :integer
#  created_at  :datetime
#  updated_at  :datetime
#  user_id     :integer
#

class LocationTag < ActiveRecord::Base

	attr_accessible :tag_id, :location_id, :user_id

	belongs_to :tag
	belongs_to :location

	validates_uniqueness_of :tag_id, scope: :location_id

end
