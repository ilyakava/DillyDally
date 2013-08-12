class LocationTagsController < ApplicationController
	def create
		@user_tag = LocationTag.new(params[:user_tag])
		if @user_tag.save
			respond_to do |format|
				format.json { render json: @user_tag }
			end
		end
	end
end