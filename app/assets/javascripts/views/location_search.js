DD.Views.LocationSearch = Backbone.View.extend({

  initialize: function ($rootEl) {
    var that = this;
    this.$rootEl = $rootEl;
    this.collection = new DD.Collections.Locations();

    // this.listenTo(that.collection, "add change", that.render);
  },

  events: {
    "click button#search-nearby": "searchNearby"
  },

  render: function () {
    var that = this;
    console.log("rendering nearby-search view initial time");
    
    var renderedContent = JST['locations/nearby_search_header']();

    window.th = that.$el;
    that.$el.html(renderedContent);
    $('.data-list').replaceWith(that.$el);
  },

  updateDisplay: function () {
    var that = this;
    console.log("rendering non-initial nearby search view");
    
    var renderedContent = JST['locations/nearby_search']({
      collection: that.collection
    });

    that.$el.find('.data-list').replaceWith(renderedContent);
    $('.data-list').html(that.$el.find('.data-list').html());
  },

  cancel: function () {
    console.log("cancelling LocationSearch View...");
    $(this.el).undelegate('button#search-nearby', 'click');
  },

  searchNearby: function () {
    var that = this;
    var searchPhrase = $(event.target).prev().val();

    // var mapCenter = map.getCenter();
    var tempLat = 40.72264044368007;
    var tempLng = -73.99240493774414;

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