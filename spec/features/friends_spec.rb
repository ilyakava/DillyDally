require 'spec_helper'

describe 'friends page' do
	before :each do
		FactoryGirl.create :test_user
		visit '/users/sign_in'
		within '.devise' do
			fill_in 'user_email', with: 'Andy@aol.com'
			fill_in 'user_password', with: 'password'
		end
		click_button 'Sign in'
	end

	it 'initially loads a list of your friends', :js => true do
		visit('/friends')
		page.has_content?('No')
	end

	it 'shows a friends locations'
	it 'shows a friends collections'
	describe 'detail tab' do
		it "lists the user's comments"
	end
end