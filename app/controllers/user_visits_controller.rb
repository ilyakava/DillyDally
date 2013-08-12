class UserVisitsController < ApplicationController

	def destroy
		@visit = UserVisit.find(params[:id])
		@visit.destroy
	end

	def create
		@visit = UserVisit.new(params[:user_visit])
		if @visit.save
			respond_to do |format|
				format.json { render json: @visit.to_json }
			end
		end
	end
end