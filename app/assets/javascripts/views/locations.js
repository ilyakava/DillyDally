DD.Views.Locations = Backbone.View.extend({
  events: {
    "click button#recenter": "recenterMapForm",
    "click p.location": "recenterMapResult"
  },

  render: function () {
    var that = this;
    var renderedContent = JST['locations/index']();
    
    that.$el.html(renderedContent);
    return that;
  },

  moveMap: function (locModel) {
    var latLng = locModel.get("latLng");
    latLng = new L.LatLng(latLng.lat, latLng.lng);
    map.setView(latLng, 15);
  },

  recenterMapResult: function () {
    var that = this;
    console.log("Kaaa!");
    // console.log($(event.target));
    var clickId = parseInt($(event.target).attr('id'), 10);
    window.SR = that.searchResults;
    that.moveMap(that.searchResults.findWhere({'myId':clickId}));
  },

  recenterMapForm: function () {
    var that = this;
    console.log("in BB view!");

    var displayResults = function (mqObjArray) {
      var recenterLoc = new DD.Collections.Locations();

      // parses array of mapquest objects into BB
      var index = 0;
      _(mqObjArray).each(function (locObj) {
        index++;
        recenterLoc.add({
          myId: index,
          country: locObj.adminArea1,
          state: locObj.adminArea3,
          city: locObj.adminArea5,
          zipcode: locObj.postalCode,
          street: locObj.street,
          latLng: locObj.latLng
        });
      });

      // display and save locations
      var locListView = JST['locations/address_list']({
        locations: recenterLoc
      });
      that.$el.find('.data-list').replaceWith(locListView);
      that.searchResults = recenterLoc;

      // sets map center to coord of 1st result
      // coordinates and zoom rating (higher # means more zoomed in)
      var firstResult = recenterLoc.first();
      that.moveMap(firstResult);
    };

    // grab clicked DOM element
    var address = $(event.target).prev().val().toString();
    // my method
    var geocoder = new MapQuest.Geocoder( API.MapQuest.key() );

    // above callback arg gets array of mapquest objs
    geocoder.query(address, displayResults);
  }
});