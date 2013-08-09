class LocationsController < ApplicationController

	before_filter :authenticate_user!

	def index
		@locations = current_user.locations.includes(:categories, :comments)
		
		respond_to do |format|
			format.json { render json: @locations.to_json(
				methods: :categories_as_array,
				include: :comments
			)}
			format.html { render :index }
		end
	end

	def create
		@location = Location.find_or_create_by(params[:location])
		@location.assign_categories_for(params[:categories])
		@location.update_attribute(:user_id, current_user.id)

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