Google = (function () {

  var Places = function (apiKey) {
    this.apiKey = apiKey;
  };

  Places.prototype.query = function (lat, lng, keywordStr, callback) {
    var url = 'https://maps.googleapis.com/maps/api/place/search/json';
    var data = {
      location: lat + "," + lng,
      // radius: myMap.getRadius(),
      radius: 500,
      types: keywordStr.replace(/,/g, "").split(" "),
      sensor: false,
      key: this.apiKey
    };

    $.ajax({
      url: url,
      data: data,
      crossDomain: true,
      dataType: "json",
      success: function (response) {
        console.log(response);
      },
      error: function (err) {
        console.log("google places request failed");
      }
    });
  };

  return {
    Places: Places
  };

})();