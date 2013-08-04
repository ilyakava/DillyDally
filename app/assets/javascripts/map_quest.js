MapQuest = (function () {

  var Geocoder = function (apiKey) {
    this.apiKey = apiKey;
  };

  Geocoder.prototype.query = function (address, callback) {
    var url = "http://www.mapquestapi.com/geocoding/v1/address?key=" +
      this.apiKey;

    // No commas allowed in address
    var request = "{location: {street: " +
      address.replace(/,/g, "") +
      "}, options: {thumbMaps: false} }";

    $.ajax({
      url: url,
      dataType: 'jsonp',
      type: 'POST',
      data: {json: request },
      success: function (response) {
        // object with .lng and .lat attributes
        var latLng = response.results[0].locations[0].latLng;
        callback( latLng.lat, latLng.lng );
        console.log("mapquest geocode success");
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