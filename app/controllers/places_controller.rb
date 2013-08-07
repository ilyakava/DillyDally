class PlacesController < ApplicationController

	# All for making the google api call without JS
	def index
    request_params = {
      "location" => params[:location],
      "sensor" => false,
      "radius" => params[:radius],
      "key" => params[:key],
      "keyword" => params[:keyword]
    }

    p "A"*40
    p params

    api_call = Addressable::URI.new(
      :scheme => "https",
      :host => "maps.googleapis.com",
      :path => "maps/api/place/nearbysearch/json",
      :query_values => request_params
     ).to_s

    json = JSON.parse(RestClient.get(api_call))
    p "Rails call to google STATUS: " + json["status"]

    respond_to do |format|
    	format.json { render :json => json["results"] }
    end
	end
end