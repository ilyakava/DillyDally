FactoryGirl.define do
	factory :category do
		name "Food"
	end

	factory :location_category do
		category
	end

	factory :location do
		name "Test-time"
	end

	factory :location_with_category, parent: :location do
		location_categories {[FactoryGirl.create(:location_category)]}
	end
end