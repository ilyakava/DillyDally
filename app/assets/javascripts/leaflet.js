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

  var basicMarker = function (locModel) {
    // expects BB location object
    var lng = locModel.get("lng");
    var lat = locModel.get("lat");
    console.log("adding a basic marker at: " + lat + ", " + lng);

    L.mapbox.markerLayer({
      type: 'Feature',
      geometry: {
        type: 'Point',
        // notice coords are in long, lat here
        coordinates: [lng, lat]
      },
      properties: {
        title: 'Test Point',
        description: 'My first marker',
        'marker-size': 'large',
        'marker-color': '#f0a'
      }
    }).addTo(map);
    // more info: http://www.mapbox.com/mapbox.js/example/v1.0.0/single-marker/
  };

  return {
    getRadius: getRadius,
    moveMap: moveMap,
    basicMarker: basicMarker
  };

})();