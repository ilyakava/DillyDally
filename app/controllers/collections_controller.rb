class CollectionsController < ApplicationController

	before_filter :authenticate_user!

	def show
		# Exactly like locations index page
		@locations = Collection.find(params[:id]).locations.includes(
			:tags,
			:categories,
			:user_visits,
			:visitors,
			:savers,
			:creator,
			:collection,
			comments: [
				:author	
			],
			location_tags: [
				:tag
			]
		)

		@locations_json = @locations.to_json(
			include: [
				:tags,
				:categories,
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
				:collection
			],
			methods: [
				:categories_as_array
			]
		)

		@tags_json = Tag.all.to_json

		@page_header = "Viewing Locations in the #{Collection.find(params[:id]).name.capitalize} Collection"

		respond_to do |format|
			format.json { render json: @locations_json}
			format.html { render :show }
		end
	end

	def index
		@collections = current_user.collections.includes(:locations)
		@collections_json = @collections.to_json(
			include: [{locations: { methods: :categories_as_array, include: :categories }}]
		)

		@page_header = "Viewing All of Your Collections"

		respond_to do |format|
			format.json { render json: @collections_json}
			format.html { render :index }
		end
	end

	def create
		@collection = Collection.new(params[:collection])

		if @collection.save
			@collection.update_attribute(:user_id, current_user.id)
			respond_to do |format|
				format.json { render json: @collection }
			end
		end
	end
end