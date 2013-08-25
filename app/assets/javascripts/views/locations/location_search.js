DD.Views.LocationSearch = Backbone.View.extend({

  initialize: function ($contentEl, userSavedData, collectionId) {
    var that = this;
    this.$contentEl = $contentEl;
    this.collection = new DD.Collections.Locations();
    this.userSavedData = userSavedData;
    this.collectionId = collectionId;
    that.searchPhrase = null;

    $contentEl.parent().bind("scroll", that.checkScroll.bind(that));
  },

  events: {
    "click button#search-nearby": "searchNearbyClick",
    "keyup input[type=text].search-nearby-box": "searchNearbyEnter",
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
    //  need to undelegate the scroll
    this.$contentEl.parent().off();
    markerManager.nearby();
  },

  searchNearbyClick: function () {
    var that = this;
    that.searchPhrase = $(event.target).prev().val();
    that.searchNearbyWith(that.searchPhrase);
  },

  searchNearbyEnter: function (event) {
    var that = this;
    that.searchPhrase = $(event.target).val();
    if (event.keyCode === 13) {
      that.searchNearbyWith(that.searchPhrase);
    }
  },

  checkScroll: function () {
    var that = this;
    // window.las = this.$contentEl.parent();
    var renderedList = this.$contentEl.parent();
    var bottomPosition = renderedList.scrollTop();
    // var info = "top of Scrolling window: " + bottomPosition +
    //   " , height of visible window: " + renderedList.height() +
    //   " , height of list: " + $('#data-list').height();
    // console.log(info);

    if (bottomPosition + renderedList.height() >= $('#data-list').height()) {

      myMap.zoomOut();
      var searchPhrase = $('#data-list').find('input[type=text]').val();
      console.log("searchPhrase is: " + searchPhrase);

      that.searchNearbyWith(searchPhrase, that.updateCollection);
      renderedList.scrollTop(bottomPosition);
    }
  },

  // searchNearbyAgain: function (searchPhrase) {

  // },

  makeCollection: function (gpObjArray) {
    var that = this;
    var nearbyLocs = new DD.Collections.Locations();
    nearbyLocs.parseGooglePlaces(gpObjArray, that.collectionId);

    that.collection = nearbyLocs;
    that.updateDisplay();
    markerManager.nearby(that.collection);
  },

  updateCollection: function (gpObjArray) {
    var that = this;
    that.collection.parseGooglePlaces(gpObjArray, that.collectionId);

    that.updateDisplay();
    markerManager.nearby(that.collection);
  },

  searchNearbyWith: function (searchPhrase, callback) {
    var that = this,
        collectionCallback;

    // var tempLat = 40.72264044368007;
    // var tempLng = -73.99240493774414;
    var mapCenter = map.getCenter();
    var tempLat = mapCenter.lat;
    var tempLng = mapCenter.lng;

    if (callback) {
      collectionCallback = callback.bind(that);
    } else {
      collectionCallback = that.makeCollection.bind(that);
    }
    
    var placeSearcher = new Google.Places( API.Google );
    placeSearcher.query(tempLat, tempLng, searchPhrase, collectionCallback);

  }
});