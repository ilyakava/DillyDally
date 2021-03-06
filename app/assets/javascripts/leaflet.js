myMap = (function () {

  var mapItems = [
    '#map',
    '.searcharea.group.recenter',
    'footer'
  ];

  var toggleDisplay = function () {
    // used in the mobile version of the app, where the map overlays everything
    myMap.mapItems.forEach(function (domNode) { $(domNode).toggle(); });
    var $toggleSwitch = $('#mobile-toggle-map');
    $toggleSwitch.toggleClass('on');
    $toggleSwitch.toggleClass('off');
  };

  var ensureDisplay = function () {
    // acts as a before filter for the mobile version, where the map is
    // hidden until needed
    myMap.mapItems.forEach(function (domNode) { $(domNode).show(); });
    $('#mobile-toggle-map').attr('class', 'on');
  }

  var zoomOut = function () {
    if (map.getZoom() >= 13) {
      map.zoomOut();
    }
  };

  var getRadius = function () {
    myMap.ensureDisplay();
    console.log("getting radius from the map on the page!");
    var mapBounds = map.getBounds();
    var degreeRadius = Math.abs(mapBounds.getCenter().lat) -
      Math.abs(mapBounds.getNorthEast().lat);

    // used to get more results from google on infinite scroll
    if (map.getZoom() < 13) {
      degreeRadius += (Math.random() / 5);
    }
    // convert to meters
    return parseInt(Math.abs(degreeRadius * 111000), 10);
  };

  var moveMap = function (locModel) {
    myMap.ensureDisplay();
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
    this.myMultiPolygon = null;
    this.mySinglePolygon = null;
  };


  MarkerManager.prototype.singlePolygon = function (collection) {
    var that = this;
    if (that.mySinglePolygon) {
      map.removeLayer(that.mySinglePolygon);
    }
    if (collection) {
      var latlngs = collection.get("locations").map(function (location) {
        return new L.LatLng(location.get("lat"), location.get("lng"));
      });

      that.mySinglePolygon = new L.Polygon(latlngs, {color: '#8A2E56'});
      that.mySinglePolygon.addTo(map);
    }
  };

  MarkerManager.prototype.multiPolygon = function (collectionCollection) {
    var that = this;
    if (this.myMultiPolygon) {
      map.removeLayer(that.myMultiPolygon);
    }
    if (collectionCollection) {
      var latlngs = collectionCollection.map(function (collection) {
        return collection.get("locations").map(function (location) {
          return new L.LatLng(location.get("lat"), location.get("lng"));
        });
      });

      // var temp = _(latlngs).map(function (collection) {
      //   var l = new L.Polygon(collection, {color: '#8A2E56'});
      //   return l;
      // });
      that.myMultiPolygon = new L.MultiPolygon(latlngs);
      that.myMultiPolygon.addTo(map);
    }
  };

  MarkerManager.prototype.mapCenter = function (locModel) {
    var that = this;
    if (this.currCenterMarker) {
      map.removeLayer(that.currCenterMarker);
    }

    if (locModel) {
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
    }
  };

  MarkerManager.prototype.makeMarker = function (locModel, iconType) {
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
          "iconUrl": iconType || Icons.general,
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

  MarkerManager.prototype.testCoords = function (lat, lng) {
    var test = new DD.Models.Location({lat: lat, lng: lng, name: "test"});
    this.makeMarker(test).addTo(map);
  };

  MarkerManager.prototype.nearby = function (locCollection) {
    var that = this;
    if (this.nearbyMarkers) {
      map.removeLayer(that.nearbyMarkers);
    }
    if (locCollection) {
      this.nearbyMarkers = this.collection(locCollection);
    }
  };

  MarkerManager.prototype.myLocations = function (locCollection) {
    var that = this;
    if (this.myLocationsMarkers) {
      map.removeLayer(that.myLocationsMarkers);
    }
    if (locCollection) {
      this.myLocationsMarkers = this.collection(locCollection, Icons.star);
    }
  };

  MarkerManager.prototype.collection = function (locCollection, iconType) {
    var that = this;
    var markers = new L.MarkerClusterGroup();
    locCollection.each(function (locModel) {
      var title = locModel.get("name");

      var marker = that.makeMarker(locModel, iconType);
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


  MarkerManager.prototype.reset = function () {
    this.multiPolygon();
    this.singlePolygon();
    this.mapCenter();
    this.nearby();
    this.myLocations();
  };

  return {
    mapItems: mapItems,
    ensureDisplay: ensureDisplay,
    toggleDisplay: toggleDisplay,
    getRadius: getRadius,
    moveMap: moveMap,
    zoomOut: zoomOut,
    MarkerManager: MarkerManager
  };

})();