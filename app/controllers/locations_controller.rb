class LocationsController < ApplicationController

	before_filter :authenticate_user!

	def index
		@locations = current_user.locations.includes(:categories)
		@locations_json = @locations.to_json(
			methods: [:categories_as_array],
			include: [{comments: { include: :author }}, {location_tags: { include: :tag }}, :user_visits, :visitors, :savers, :creator]
		)
		@tags_json = Tag.all.to_json

		@page_header = "Viewing Locations Across All of Your Collections"

		respond_to do |format|
			format.json { render json: @locations_json}
			format.html { render :index }
		end
	end

	def show
		@location = Location.find(params[:id])
		@locations_json = @location.to_json(
			methods: [:categories_as_array],
			include: [{comments: { include: :author }}, {location_tags: { include: :tag }}, :user_visits, :visitors, :savers, :creator]
		)
		respond_to do |format|
			format.json { render json: @locations_json}
			# format.html { render :index }
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
			if params[:collection_id]
				@collectionlocation = CollectionLocation.create(
					collection_id: params[:collection_id],
					location_id: @location.id
				)
			end
			respond_to do |format|
				format.json { render json: @location }
			end
		end
	end
end