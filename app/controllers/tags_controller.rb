class TagsController < ApplicationController

	def index
		@tags = Tag.all

		respond_to do |format|
			format.json { render json: @tags.to_json}
		end		
	end


	def create
		@tag = Tag.new(params[:tag])
		if @tag.save
			respond_to do |format|
				format.json { render json: @tag }
			end
		end
	end
end