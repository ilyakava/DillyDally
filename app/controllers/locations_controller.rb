class LocationsController < ApplicationController

	def create
		@location = Location.new(params[:location])
		if @location.save
			respond_to do |format|
				format.json { render json: @location }
			end
		end
	end
end