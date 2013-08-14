class CollectionsController < ApplicationController

	before_filter :authenticate_user!

	def show
		# Exactly like locations index page
		@locations = Collection.find(params[:id]).locations
		@locations_json = @locations.to_json(
			methods: [:categories_as_array],
			include: [{comments: { include: :author }}, {location_tags: { include: :tag }}, :user_visits, :visitors, :savers, :creator]
		)
		@tags_json = Tag.all.to_json

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