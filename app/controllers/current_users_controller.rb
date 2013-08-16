class CurrentUsersController < ApplicationController
	def index
		@current_user = User.includes(
			collections: {
				locations: [
					:tags,
					:categories
				]
			},
			locations: [
				:tags,
				:categories,
				:collections,
				:visitors,
				:savers
			],
			friends: [
				:locations,
				:collections
			]
		).find(current_user.id)

		@current_user_json = @current_user.to_json(
			include: [
				{collections: {
					include: {
						locations: {
							include: [
								:tags,
								:categories
							],
							methods: [
								:categories_as_array
							]
						}
					}
				}},
				{locations: {
					include: [
						:tags,
						:categories,
						:collections,
						:visitors,
						:savers
					]
				}},
				{friends: {
					include: [
						:locations,
						:collections
					]
				}}
			]
		)

		respond_to do |format|
			format.json { render json: @current_user_json}
			format.html { render :index }
		end		
	end
end