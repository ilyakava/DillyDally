DD.Views.Locations = Backbone.View.extend({
  events: {
    "click button#recenter": "recenterMap"
  },

  render: function () {
    var that = this;
    var renderedContent = JST['locations/index']();
    

    that.$el.html(renderedContent);
    return that;
  },

  recenterMap: function () {
    var that = this;
    console.log("in BB view!");

    var displayResults = function (mqObjArray) {
      var recenterLoc = new DD.Collections.Locations();

      // parses array of mapquest objects
      _(mqObjArray).each(function (locObj) {
        recenterLoc.add({
          test: "hoo",
          country: locObj.adminArea1,
          state: locObj.adminArea3,
          city: locObj.adminArea5,
          zipcode: locObj.postalCode,
          street: locObj.street,
          latLng: locObj.latLng
        });
      });

      // display locations
      var locList = JST['locations/address_list']({
        locations: recenterLoc
      });
      that.$el.find('.data-list').replaceWith(locList);

      // coordinates and zoom rating (higher # means more zoomed in)
      // map.setView(latLng, 15);
    };

    var address = $(event.target).prev().val().toString();
    var geocoder = new MapQuest.Geocoder( API.MapQuest.key() );

    // will take a callback that:
    // makes a collection of location objects
    // displays those collection objects in sidebar
    // recenters the map on the 1st object
    // callback arg gets array of mapquest objs
    geocoder.query(address, displayResults);
  }
});