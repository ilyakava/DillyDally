DD.Collections.Locations = Backbone.Collection.extend({
  url: '/locations',
  model: DD.Models.Location,

  parseMapQuest: function (mqObjArray) {
    var that = this;
    var index = 0;
    _(mqObjArray).each(function (locObj) {
      index++;
      that.add({
        myId: index,
        address: locObj.street + " " + locObj.adminArea5 + " " +
          locObj.adminArea3 + " " + locObj.postalCode +
          ", " + locObj.adminArea1,
        lat: locObj.latLng.lat,
        lng: locObj.latLng.lng,
        // check mapquest.js for description of MQ objects
      });
    });
  },

  parseGooglePlaces: function (gpObjArray, collectionId) {
    var that = this;
    _(gpObjArray).each(function (locObj) {
      var lat = locObj.geometry.location.lat;
      var lng = locObj.geometry.location.lng;

      // findWhere used because google places may add to the nearbyLocs
      // collection upon additional load for infinite scroll
      if (!that.findWhere({lat: lat, lng: lng})) {
        that.add({
          address: locObj.vicinity,
          name: locObj.name,
          categories: locObj.types,
          lat: lat,
          lng: lng,
          collection_id: collectionId
        });
      }
    });
  }
});