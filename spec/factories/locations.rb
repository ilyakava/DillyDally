FactoryGirl.define do
	factory :category do |f|
		f.name "Food"
	end

	factory :location_category do |f|
		category
	end

	factory :location do |f|
		location_category
	end
end