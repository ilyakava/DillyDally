DD.Collections.Locations = Backbone.Collection.extend({
  model: DD.Models.Location,

  parseMapQuest: function (mqObjArray) {
    var that = this;
    var index = 0;
    _(mqObjArray).each(function (locObj) {
      index++;
      that.add({
        myId: index,
        country: locObj.adminArea1,
        state: locObj.adminArea3,
        city: locObj.adminArea5,
        zipcode: locObj.postalCode,
        street: locObj.street,
        latLng: locObj.latLng
      });
    });
  },

  parseGooglePlaces: function () {
    console.log("hi");
  }
});