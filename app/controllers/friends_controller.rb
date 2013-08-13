class FriendsController < ApplicationController

	def index
		@friends = current_user.friends
		@friends_json = @friends.to_json(
			include: [:user_locations, :collections]
		)
		@users_json = User.all.to_json

		respond_to do |format|
			format.json { render json: @friends_json}
			format.html { render :index }
		end		
	end
end