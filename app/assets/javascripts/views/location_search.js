DD.Views.LocationSearch = Backbone.View.extend({

  initialize: function ($contentEl, userSavedData) {
    var that = this;
    this.$contentEl = $contentEl;
    this.collection = new DD.Collections.Locations();
    this.userSavedData = userSavedData;
  },

  events: {
    "click button#search-nearby": "searchNearby"
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

    if (!that.collection.length) {
      that.$el.find('ul.nearby-search-results').append('<li>No Results Found</li>');
    }
  },

  cancel: function () {
    console.log("cancelling LocationSearch View...");
    $(this.el).undelegate('button#search-nearby', 'click');
  },

  searchNearby: function () {
    var that = this;
    var searchPhrase = $(event.target).prev().val();

    // var tempLat = 40.72264044368007;
    // var tempLng = -73.99240493774414;
    var mapCenter = map.getCenter();
    var tempLat = mapCenter.lat;
    var tempLng = mapCenter.lng;

    var makeCollection = function (gpObjArray) {
      var nearbyLocs = new DD.Collections.Locations();
      nearbyLocs.parseGooglePlaces(gpObjArray);

      that.collection = nearbyLocs;
      that.updateDisplay();
    };
    
    var placeSearcher = new Google.Places( API.Google.key() );
    placeSearcher.query(tempLat, tempLng, searchPhrase, makeCollection);
  }
});