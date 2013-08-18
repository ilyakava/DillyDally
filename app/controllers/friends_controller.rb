class FriendsController < ApplicationController

	def index
		@friends = current_user.friends.includes(:locations, :collections)
		@friends_json = @friends.to_json(
			include: [{locations: {methods: [:categories_as_array],
			include: [{comments: { include: :author }}, {location_tags: { include: :tag }}, :user_visits, :visitors, :savers, :creator]}}, {collections: {include: [{locations: { methods: :categories_as_array, include: :categories }}]}}]
		)
		@users_json = User.all.to_json

		respond_to do |format|
			format.json { render json: @friends_json}
			format.html { render :index }
		end		
	end

	def locations
		@friend = User.includes(
			locations: [
				:tags,
				:categories,
				:user_visits,
				:visitors,
				:savers,
				:creator,
				comments: [
					:author	
				],
				location_tags: [
					:tag
				]
			]
		).find(params[:id])

		@friend_json = @friend.to_json(
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
						:creator
					],
					methods: [
						:categories_as_array
					]
				}
			]
		)

		@users_json = User.all.to_json
		
		respond_to do |format|
			format.json { render json: @friend_json}
			format.html { render :index }
		end		
	end

	def collections
		@friend = User.includes(
			collections: {
				locations: [
					:tags,
					:categories
				]
			}
		).find(params[:id])

		@friend_json = @friend.to_json(
			include: [
				{
					collections: {
						include: {
							locations: {
								include: [
									:tags,
									:categories
								],
								methods: [
									:categories_as_array
								]
							}
						}
					}
				}
			]
		)

		@users_json = User.all.to_json
		
		respond_to do |format|
			format.json { render json: @friend_json}
			format.html { render :index }
		end		
	end
end