class LocationsController < ApplicationController

	before_filter :authenticate_user!

	def index
		@locations = current_user.locations
		
		respond_to do |format|
			format.json { render json: @locations }
			format.html { render :index }
		end
	end

	def create
		@location = Location.find_or_create_by(params[:location])
		@location.assign_categories_for
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