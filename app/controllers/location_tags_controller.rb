class LocationTagsController < ApplicationController
	
	def destroy
		@user_tag = LocationTag.find(params[:id])
		@user_tag.destroy!
		respond_to do |format|
			format.json { render json: @user_tag.to_json }
		end
	end

	def create
		@user_tag = LocationTag.new(params[:location_tag])
		if @user_tag.save
			respond_to do |format|
				format.json { render json: @user_tag }
			end
		end
	end
end