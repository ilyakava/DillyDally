names = %w{Andy Bob Carl Dan Eric Frank Gareth Harold}

# FactoryGirl.define do
# 	sequence(:email, names) do |name|
# 		"#{name}@aol.com"
# 	end
# end

FactoryGirl.define do
	sequence :email do |i|
		"#{names[i]}@aol.com"
	end

	factory :user do
		email
		password "password"
		password_confirmation "password"
	end

	factory :test_user, parent: :user do
		friends {[
			FactoryGirl.create(:user),
			FactoryGirl.create(:user)
		]}
	end
end