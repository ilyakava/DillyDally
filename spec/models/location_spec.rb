require 'spec_helper'

describe Location do
	it "has a valid factory" do
		FactoryGirl.create(:location_with_category).categories.
			should_not be_empty
	end

	it "can return categories_as_array" do
		location = FactoryGirl.create(:location_with_category)
		location.categories_as_array.should == ["Food"]
	end

	describe "assign_categories_for a location" do
		
		let(:location) { FactoryGirl.create(:location) }

		it "has no categories initially" do
			location.categories.should be_empty
		end

		it "can have categories assigned to it" do
			location.assign_categories_for(["Food"])
			location.categories.should_not be_empty
		end	
	end
end