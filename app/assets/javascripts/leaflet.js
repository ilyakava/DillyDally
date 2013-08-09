myMap = (function () {

  var getRadius = function () {
    var mapBounds = map.getBounds();
    var degreeRadius = Math.abs(mapBounds.getCenter().lat) -
      Math.abs(mapBounds.getNorthEast().lat);
    // convert to meters
    return parseInt(Math.abs(degreeRadius * 111000), 10);
  };

  var moveMap = function (locModel) {
    // expects BB location object
    var lng = locModel.get("lng");
    var lat = locModel.get("lat");
    console.log("moving map to: " + lat + ", " + lng);
    // Leaflet method
    latLng = new L.LatLng(lat, lng);
    // coordinates and zoom rating (higher # means more zoomed in)
    map.setView(latLng, 15);
  };

  return {
    getRadius: getRadius,
    moveMap: moveMap
  };

})();