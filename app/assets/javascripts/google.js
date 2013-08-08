Google = (function () {

  var Places = function (apiKey) {
    this.apiKey = apiKey;
  };

  Places.prototype.query = function (lat, lng, keywordStr, callback) {
    var data = {
      location: lat + "," + lng,
      radius: ( $('.leaflet-layer').length ? myMap.getRadius() : 500),
      keyword: keywordStr.replace(/,/g, "").replace(/\s/g, "+"),
      sensor: false,
      key: this.apiKey
    };

    $.ajax({
      url: '/places',
      type: 'GET',
      dataType: "json",
      data: data,
      success: function (response) {
        callback(response);
        // console.log(response);
      },
      error: function (err) {
        console.log("google places Ajax to RAILS delegation failed");
      }
    });
  };

  return {
    Places: Places
  };

})();