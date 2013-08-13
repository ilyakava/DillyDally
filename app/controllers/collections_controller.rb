class CollectionsController < ApplicationController

	before_filter :authenticate_user!

	def index
		@collections = current_user.collections.includes(:locations)
		@collections_json = @collections.to_json(
			include: [{locations: { methods: :categories_as_array }}]
		)

		respond_to do |format|
			format.json { render json: @collections_json}
			format.html { render :index }
		end
	end

end