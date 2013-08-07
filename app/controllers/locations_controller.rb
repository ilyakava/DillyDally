class LocationsController < ApplicationController

	before_filter :authenticate_user!

	def create
		@location = Location.find_or_create_by(params[:location])
		if @location
			@userlocation = UserLocation.create(
				user_id: current_user.id,
				location_id: @location.id
			)
			respond_to do |format|
				format.json { render json: @location }
			end
		end
	end
end