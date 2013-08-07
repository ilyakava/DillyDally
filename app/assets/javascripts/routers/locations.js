DD.Routers.Locations = Backbone.Router.extend({
  initialize: function ($headEl, $contentEl, locationsData) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;

    this.bootstrappedData = locationsData;
    this.firstLoad = true;
    
    // render head of searchbar (tabs and recenter searchbar)
    var searchbarHead = new DD.Views.LocationsHead();
    this.$headEl.html(searchbarHead.render().$el);

    // needs to Launch myLocations view
  },

  routes: {
    "" : "myLocations",
    "recenter-by-search": "recenterBySearch",
    "search-nearby": "searchNearby"
  },

  myLocations: function () {
    // should show your locations in data-list
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }



    var allMyLocations = new DD.Views.MyLocations({
      $rootEl: that.$contentEl,
      collection: (that.firstLoad ? that.bootstrappedData : new DD.Collections.Locations())
    });

    (that.firstLoad ? that.firstLoad = false : allMyLocations.fetch() );
    
    that.$contentEl.html(allMyLocations.render().$el.html());
    console.log("rendering user locations");
    that.activeView = allMyLocations;
  },

  recenterBySearch: function () {
    var that = this;

    // unbinds events
    // http://stackoverflow.com/questions/6831362/backbone-js-view-cant-unbind-events-properly?rq=1
    if (that.activeView) { that.activeView.cancel(); }

    // triggered by a click in the head view
    // renders into data-list element
    var recenterResults = new DD.Views.RecenterResults(that.$contentEl);
    recenterResults.render();
    console.log("recenter search method/view finished");

    that.activeView = recenterResults;
  },

  searchNearby: function () {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    var newLocationSearch = new DD.Views.LocationSearch(that.$contentEl);
    newLocationSearch.render();

    that.activeView = newLocationSearch;
  }
});