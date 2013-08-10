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
    this.nearbyMarkers = null;
    this.myLocationsMarkers = null;
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

  MarkerManager.prototype.makeMarker = function (locModel) {
    var lng = locModel.get("lng");
    var lat = locModel.get("lat");
    var title = locModel.get("name");
    // L.marker takes LatLng obj and has options title and icon
    // the icon option takes a L.icon object
    return L.marker(
      new L.LatLng(lat, lng),
      {
        title: title,
        icon: new L.icon ({
          // in the future will call method to choose marker from categories
          "iconUrl": Icons.general,
          "iconSize": [26, 26 ],
          "iconAnchor": [13, 13],
          "popupAnchor": [0, -13]
          // "shadowUrl": Icons.cafeBG,
          // "shadowSize": [60, 60],
          // "shadowAnchor": [30,30],
        })
      }
    );
  };

  MarkerManager.prototype.nearby = function (locCollection) {
    var that = this;
    if (this.nearbyMarkers) {
      map.removeLayer(that.nearbyMarkers);
    }
    this.nearbyMarkers = this.collection(locCollection);
  };

  MarkerManager.prototype.myLocations = function (locCollection) {
    var that = this;
    if (this.myLocationsMarkers) {
      map.removeLayer(that.myLocationsMarkers);
    }
    this.myLocationsMarkers = this.collection(locCollection);
  };

  MarkerManager.prototype.collection = function (locCollection) {
    var that = this;
    var markers = new L.MarkerClusterGroup();
    locCollection.each(function (locModel) {
      var title = locModel.get("name");

      var marker = that.makeMarker(locModel);
      marker.bindPopup(title);
      markers.addLayer(marker);
    });
    map.addLayer(markers);
    return markers;
    // more info: http://www.mapbox.com/mapbox.js/example/v1.0.0/leaflet-markercluster/
  };

  // var iconRankingHash = {
  //   "art_gallery" :
  //   "bakery" :
  //   "bank" :
  //   "bar" :
  //   "bicycle_store" :
  //   "book_store" :
  //   "university" :
  //   "library" :
  //   "bus_station" :
  //   "cafe" :
  //   "campground" :
  //   "cemetery" :
  //   "church" :
  //   "clothing_store" :
  //   "convenience_store" :
  //   "department_store" :
  //   "electronics_store" :
  //   "shoe_store" :
  //   "shopping_mall" :
  //   "pet_store" :
  //   "food" :
  //   "meal_delivery" :
  //   "meal_takeaway" :
  //   "furniture_store" :
  //   "store" :
  //   "gas_station" :
  //   "gym" :
  //   "hair_care" :
  //   "beauty_salon" :
  //   "health" :
  //   "hindu_temple" :
  //   "jewelry_store" :
  //   "laundry" :
  //   "movie_rental" :
  //   "movie_theater" :
  //   "museum" :
  //   "night_club" :
  //   "park" :
  //   "parking" :
  //   "pharmacy" :
  //   "post_office" :
  //   "spa" :
  //   "stadium" :
  //   "subway_station" :
  //   "train_station" :
  //   "zoo" :
  // };
  // var iconFileHash = {

  // }

  return {
    getRadius: getRadius,
    moveMap: moveMap,
    MarkerManager: MarkerManager
  };

})();