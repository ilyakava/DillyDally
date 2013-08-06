MapQuest = (function () {

  var Geocoder = function (apiKey) {
    this.apiKey = apiKey;
  };

  Geocoder.prototype.query = function (address, callback) {
    var url = "http://www.mapquestapi.com/geocoding/v1/address?key=" +
      this.apiKey;

    // No commas allowed in address
    // format help at: http://developer.mapquest.com/web/products/forums/-/message_boards/view_message/134944
    var request = "{location: {street: " +
      address.replace(/,/g, "") +
      "}, options: {thumbMaps: false} }";

    $.ajax({
      url: url,
      dataType: 'jsonp',
      type: 'POST',
      data: {json: request },
      success: function (response) {
        // Relevant properties of each location obj:
        // adminArea1 = Country
        // adminArea3 = State
        // adminArea5 = City
        // postalCode
        // street
        // latLng (has .lng and .lat attributes)
        var locationList = response.results[0].locations;

        console.log("mapquest geocode success: " +
          locationList.length + " results."
        );
        callback(locationList);
        // return locationList <- should I?? 
      },
      error: function (err) {
        console.log("mapquest geocode failed");
      }
    });
  };

  return {
    Geocoder: Geocoder
  };


})();