class FriendsController < ApplicationController

	def index
		@friends = current_user.friends.includes(:locations, :collections)
		@friends_json = @friends.to_json(
			include: [{locations: {methods: [:categories_as_array],
			include: [{comments: { include: :author }}, {location_tags: { include: :tag }}, :user_visits, :visitors, :savers, :creator]}}, :collections]
		)
		@users_json = User.all.to_json

		respond_to do |format|
			format.json { render json: @friends_json}
			format.html { render :index }
		end		
	end
end