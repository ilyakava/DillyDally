class CurrentUsersController < ApplicationController
	def index
		@current_user = User.includes(
			:locations,
			:friends,
			collections: {
				locations: [
					:tags,
					:categories
				]
			}
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
				:locations,
				:friends
			]
		)

		respond_to do |format|
			format.json { render json: @current_user_json}
			format.html { render :index }
		end		
	end
end