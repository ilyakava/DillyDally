class CollectionLocationsController < ApplicationController
	
	def destroy
		@collection_location = CollectionLocation.find(params[:id])
		@collection_location.destroy
		respond_to do |format|
			format.json { render json: @collection_location.to_json }
		end
	end

	def create
		@collection_location = CollectionLocation.new(params[:collection_location])
		if @collection_location.save
			respond_to do |format|
				format.json { render json: @collection_location }
			end
		end
	end
end