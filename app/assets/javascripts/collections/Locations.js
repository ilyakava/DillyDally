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

  parseGooglePlaces: function (gpObjArray) {
    var that = this;
    var index = 0;
    _(gpObjArray).each(function (locObj) {
      index++;
      that.add({
        myId: index,
        address: locObj.vicinity,
        name: locObj.name,
        categories: locObj.types,
        lat: locObj.geometry.location.lat,
        lng: locObj.geometry.location.lng
      });
    });
  }
});