# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User.create(
# 	email: "ilya@aol.com",
# 	password: "password",
# 	password_confirmation: "password"
# )

# User.create(
# 	email: "cat@aol.com",
# 	password: "password",
# 	password_confirmation: "password"
# )

# tags = %w{no-wifi super-cold very-small open-late no-power-plugs}
# tags.each do |tag|
# 	Tag.create(name: tag)
# end

names = %w{weekender galleries rainy-day}

names.each do |name|
	Collection.create(
		name: name, 
		user_id: 1
	)
end

names.length.times do |i|
	CollectionLocation.create(
		collection_id: (i + 1),
		location_id: 1
	)
end