# == Schema Information
#
# Table name: user_visits
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  location_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#

class UserVisit < ActiveRecord::Base
	attr_accessible :user_id, :location_id

	belongs_to :user
	belongs_to :location
	
end
