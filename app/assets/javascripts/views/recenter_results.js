DD.Views.RecenterResults = Backbone.View.extend({
  events: {
    "click p.location": "centerFromList"
    // "click button#recenter": "render"
  },

  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.checkTabs();
  },

  modifyDOM: function () {

  },

  OLDrender: function () {
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

  checkTabs: function () {
    // reaches outside of its own view
    if (!$('#didumean').length) {
      $('ul.tabs').append('<li><a id="didumean"'+
        'href="#">Did You Mean?</a></li>'
      );
    }
  },

  render: function () {
    var that = this;

    var displayResults = function (mqObjArray) {
      console.log("display results method starts");

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
      // Modify DOM
      that.$el.html(locListView);
      $('.data-list').replaceWith(that.$el);
      // save BB collection for future use, w/o persisting
      that.searchResults = recenterLocs;

      // sets map center to latLng of 1st result
      that.moveMap(recenterLocs.first());
      that.indentResult(1);
      console.log("display results method finished");
    };

    // grab searchbar element
    var address = $('.recenter input[type=text]').val().toString();

    // method to instantiate my interface with mapquest
    var geocoder = new MapQuest.Geocoder( API.MapQuest.key() );

    // above callback arg recieves array of mapquest objs
    geocoder.query(address, displayResults);
    // ensures a "did you mean" **tab** is rendered
    that.checkTabs();
    return this;
  }
});