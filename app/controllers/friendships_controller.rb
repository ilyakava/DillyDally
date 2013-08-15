class FriendshipsController < ApplicationController
	def create
		@friendship = Friendship.new(params[:friendship])
		if @friendship.save
			respond_to do |format|
 				format.json { render json: @friendship }
			end
		end
	end
end