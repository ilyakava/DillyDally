# == Schema Information
#
# Table name: locations
#
#  id         :integer          not null, primary key
#  address    :string(255)
#  lat        :float
#  lng        :float
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  user_id    :integer
#

class Location < ActiveRecord::Base
	attr_accessible :address, :lat, :lng, :name, :user_id

	belongs_to :creator, class_name: 'User', foreign_key: :user_id

	has_many :location_categories
	has_many :categories, through: :location_categories

end
