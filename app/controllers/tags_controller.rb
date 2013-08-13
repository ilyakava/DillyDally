class TagsController < ApplicationController

	def create
		@tag = Tag.new(params[:tag])
		if @tag.save
			respond_to do |format|
				format.json { render json: @tag }
			end
		end
	end
end