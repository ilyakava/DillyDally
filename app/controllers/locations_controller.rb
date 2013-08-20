class LocationsController < ApplicationController

	before_filter :authenticate_user!

	def index
		@locations = current_user.locations.includes(
			:categories,
			:user_visits,
			:visitors,
			:savers,
			:creator,
			:collections,
			collection_locations: [
				:collection
			],
			comments: [
				:author	
			],
			location_tags: [
				:tag
			]
		)
		@locations_json = @locations.to_json(
			include: [
				{
					comments: {
						include: [
							:author
						]
					}
				},
				{
					location_tags: {
						include: [
							:tag
						]
					}
				},
				:user_visits,
				:visitors,
				:savers,
				:creator,
				:collections,
				{
					collection_locations: {
						include: [
							:collection
						]
					}
				},
			],
			methods: [
				:categories_as_array
			]	
		)
		@tags_json = Tag.all.to_json

		@page_header = "Viewing Locations Across All of Your Collections"

		respond_to do |format|
			format.json { render json: @locations_json}
			format.html { render :index }
		end
	end

	def show
		@location = Location.includes(
			:categories,
			:user_visits,
			:visitors,
			:savers,
			:creator,
			:collections,
			comments: [
				:author	
			],
			location_tags: [
				:tag
			]
		).find(params[:id])

		@locations_json = @location.to_json(
			include: [
				{
					comments: {
						include: [
							:author
						]
					}
				},
				{
					location_tags: {
						include: [
							:tag
						]
					}
				},
				:user_visits,
				:visitors,
				:savers,
				:creator,
				:collections,
			],
			methods: [
				:categories_as_array
			]	
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