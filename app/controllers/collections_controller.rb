class CollectionsController < ApplicationController

	before_filter :authenticate_user!

	def show
		# Exactly like locations index page
		@collections = Collection.includes(
			locations: [
				:tags,
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
			]
		).find(params[:id])

		@collections_json = @collections.to_json(
			include: [
				locations: {
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
						:collections,
						{
							collection_locations: {
								include: [
									:collection
								]
							}
						}
					],
					methods: [
						:categories_as_array
					]
				}
			]
		)

		respond_to do |format|
			format.json { render json: @collections_json}
		end
	end

	def index
		@collections = current_user.collections.includes(locations: :categories)
		@collections_json = @collections.to_json(
			include: [{locations: { methods: :categories_as_array, include: :categories }}]
		)

		respond_to do |format|
			format.json { render json: @collections_json}
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