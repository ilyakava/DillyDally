DD.Collections.Locations = Backbone.Collection.extend({
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
        latLng: locObj.latLng
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
        latLng: locObj.geometry.location
      });
    });
  }
});