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
    map.setView(latLng, 16);
  };

  var MarkerManager = function () {
    this.currCenterMarker = null;
    this.collectionMarkers = null;
  };

  MarkerManager.prototype.mapCenter = function (locModel) {
    var that = this;
    if (this.currCenterMarker) {
      map.removeLayer(that.currCenterMarker);
    }
    // expects BB location object
    // Best with global search results - i.e. map centering
    var lng = locModel.get("lng");
    var lat = locModel.get("lat");
    var address = locModel.get("address");
    console.log("adding a basic marker at: " + lat + ", " + lng);

    this.currCenterMarker = L.mapbox.markerLayer({
      type: 'Feature',
      geometry: {
        type: 'Point',
        // notice coords are in long, lat here
        coordinates: [lng, lat]
      },
      properties: {
        title: address,
        description: 'Map Center',
        'marker-size': 'large',
        // my red color rgb(156, 56,  45)
        'marker-color': '9C382D'
      }
    });
    // more info: http://www.mapbox.com/mapbox.js/example/v1.0.0/single-marker/
    this.currCenterMarker.addTo(map);
  };

  MarkerManager.prototype.collection = function (locCollection) {
    var markers = new L.MarkerClusterGroup();
    locCollection.each(function (locModel) {
      var lng = locModel.get("lng");
      var lat = locModel.get("lat");
      var title = locModel.get("name");
      
      // L.marker takes LatLng obj and has options title and icon
      // the icon option takes a L.icon object
      var marker = L.marker(
        new L.LatLng(lat, lng),
        {
          title: title,
          icon: new L.icon ({
            "iconUrl": Icons.cafe,
            "iconSize": [25, 15],
            "iconAnchor": [25, 25],
            "popupAnchor": [0, -25]
          })
        }
      );
      marker.bindPopup(title);
      markers.addLayer(marker);
    });
    map.addLayer(markers);
    this.collectionMarkers = markers;
    // more info: http://www.mapbox.com/mapbox.js/example/v1.0.0/leaflet-markercluster/
  };

  return {
    getRadius: getRadius,
    moveMap: moveMap,
    MarkerManager: MarkerManager
  };

})();