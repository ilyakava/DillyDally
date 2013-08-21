DD.Views.LocationSearch = Backbone.View.extend({

  initialize: function ($contentEl, userSavedData, collectionId) {
    var that = this;
    this.$contentEl = $contentEl;
    this.collection = new DD.Collections.Locations();
    this.userSavedData = userSavedData;
    this.collectionId = collectionId;
  },

  events: {
    "click button#search-nearby": "searchNearbyClick",
    "keyup input[type=text].search-nearby-box": "searchNearbyEnter"
  },

  render: function () {
    var that = this;
    console.log("rendering nearby-search view initial time");
    
    var renderedContent = JST['locations/nearby_search_header']();

    that.$el.html(renderedContent);
    return that;
  },

  updateDisplay: function () {
    var that = this;
    console.log("rendering non-initial nearby search view");

    // clear destination of old search locations
    that.$el.find('ul.nearby-search-results').html("");

    that.collection.each(function (location) {
      singleLocation = new DD.Views.NearbyResult({
        model: location,
        collection: that.userSavedData
      });
      that.$el.find('ul.nearby-search-results').append(singleLocation.render().$el);
    });

    var html = '<li>No results were found on the current map view.' +
      ' Zoom out to widen your search area.</li>';
    if (!that.collection.length) {
      that.$el.find('ul.nearby-search-results').append(html);
    }
  },

  cancel: function () {
    console.log("cancelling LocationSearch View...");
    $(this.el).undelegate('button#search-nearby', 'click');
    markerManager.nearby();
  },

  searchNearbyClick: function () {
    var that = this;
    that.searchNearbyWith($(event.target).prev().val());
  },

  searchNearbyEnter: function (event) {
    var that = this;
    if (event.keyCode === 13) {
      that.searchNearbyWith($(event.target).val());
    }
  },

  searchNearbyWith: function (searchPhrase) {
    var that = this;

    // var tempLat = 40.72264044368007;
    // var tempLng = -73.99240493774414;
    var mapCenter = map.getCenter();
    var tempLat = mapCenter.lat;
    var tempLng = mapCenter.lng;

    var makeCollection = function (gpObjArray) {
      var nearbyLocs = new DD.Collections.Locations();
      nearbyLocs.parseGooglePlaces(gpObjArray, that.collectionId);

      that.collection = nearbyLocs;
      that.updateDisplay();
      markerManager.nearby(that.collection);
    };
    
    var placeSearcher = new Google.Places( API.Google );
    placeSearcher.query(tempLat, tempLng, searchPhrase, makeCollection);
  }
});