class CurrentUsersController < ApplicationController
	before_filter :authenticate_user!

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
				{
					collections: {
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
					}
				},
				:locations,
				:friends
			]
		)

		@users_json = User.all.to_json
		@tags_json = Tag.all.to_json
		@collection_choices_json = @current_user.collections.to_json
		
		respond_to do |format|
			format.json { render json: @current_user_json}
			format.html { render :index }
		end		
	end
end