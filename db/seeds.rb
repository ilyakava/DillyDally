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

# names = %w{weekender galleries rainy-day}

# names.each do |name|
# 	Collection.create(
# 		name: name, 
# 		user_id: 1
# 	)
# end

# names.length.times do |i|
# 	CollectionLocation.create(
# 		collection_id: (i + 1),
# 		location_id: 1
# 	)
# end

# emails = %w{alex bob carl dan}
# emails.each do |email|
# 	User.create(
# 		email: email + "@aol.com",
# 		password: "password",
# 		password_confirmation: "password"
# 	)
# end

# (emails.count - 1).times do |i|
# 	Friendship.create(
# 		user_id: 1,
# 		friend_id: (i + 2)
# 	)
# end