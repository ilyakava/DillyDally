DD.Views.Locations = Backbone.View.extend({
  events: {
    "click button#recenter": "centerFromSearch",
    "click p.location": "centerFromList"
  },

  render: function () {
    // initial render contains no data yet.
    // later, add display of user's locations near current
    // location, i.e. default center/location detection
    var that = this;
    var renderedContent = JST['locations/index']();
    
    that.$el.html(renderedContent);
    return that;
  },

  moveMap: function (locModel) {
    // expects BB location object
    var latLng = locModel.get("latLng");
    // Leaflet method
    latLng = new L.LatLng(latLng.lat, latLng.lng);
    // coordinates and zoom rating (higher # means more zoomed in)
    map.setView(latLng, 15);
  },

  centerFromList: function () {
    // only triggered when user clicks on address_list view
    var that = this;
    var clickId = parseInt($(event.target).attr('id'), 10);
    that.moveMap(that.searchResults.findWhere({'myId':clickId}));
    // Visually distinguish active location
    that.indentResult(clickId);
  },

  indentResult: function (myId) {
    $('p.location').each(function (location) {
      if (this.id == myId) {
        $(this).addClass("map-center");
      } else {
        $(this).removeClass("map-center");
      }
    });
  },

  centerFromSearch: function () {
    var that = this;

    var displayResults = function (mqObjArray) {
      var recenterLocs = new DD.Collections.Locations();

      // parses array of mapquest objects into BB collection
      var index = 0;
      _(mqObjArray).each(function (locObj) {
        index++;
        recenterLocs.add({
          myId: index,
          country: locObj.adminArea1,
          state: locObj.adminArea3,
          city: locObj.adminArea5,
          zipcode: locObj.postalCode,
          street: locObj.street,
          latLng: locObj.latLng
        });
      });

      // render locations from BB collection
      var locListView = JST['locations/address_list']({
        locations: recenterLocs
      });
      that.$el.find('.data-list').replaceWith(locListView);
      // save BB collection for future use, w/o persisting
      that.searchResults = recenterLocs;

      // sets map center to latLng of 1st result
      that.moveMap(recenterLocs.first());
      that.indentResult(1);
    };

    // grab clicked DOM element
    var address = $(event.target).prev().val().toString();
    // my method
    var geocoder = new MapQuest.Geocoder( API.MapQuest.key() );

    // above callback arg gets array of mapquest objs
    geocoder.query(address, displayResults);
  }
});