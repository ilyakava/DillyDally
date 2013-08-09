# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  body       :text
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class Comment < ActiveRecord::Base

	attr_accessible :body, :user_id, :location_id

	belongs_to :user
	belongs_to :location

	def author_name
		self.user.email
	end

end
