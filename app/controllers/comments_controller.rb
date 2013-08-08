class CommentsController < ApplicationController

	def index
		@comments = current_user.comments
		respond_to do |format|
			format.json { render json: @comments }
		end
	end

	def create
		@comment = Comment.create!(params[:comment])

		respond_to do |format|
			format.json { render json: @comment }
		end
	end

end