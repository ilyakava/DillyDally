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

	def assign_categories_for(category_array)
		category_array.each do |category_name|
			p "-"*50
			p category_name
			category = Category.find_or_create_by({name: category_name})
			LocationCategory.create!(
				location_id: self.id,
				category_id: category.id
			)
		end
	end

	def categories_as_array
		self.categories.map { |active_rec_obj| active_rec_obj.name }
	end
end
