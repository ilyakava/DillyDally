# == Schema Information
#
# Table name: comments
#
#  id          :integer          not null, primary key
#  body        :text
#  user_id     :integer
#  created_at  :datetime
#  updated_at  :datetime
#  location_id :integer
#

class Comment < ActiveRecord::Base

	attr_accessible :body, :user_id, :location_id

	belongs_to :author, class_name: 'User', foreign_key: :user_id
	belongs_to :location

end
