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

    var MyLocationsView = new DD.Views.MyLocations({
      collection: new DD.Collections.Locations(that.bootstrappedData)
    });
    console.log("Collection has " + MyLocationsView.collection.length + " things in it");
    console.log(MyLocationsView.collection);
 
    if (that.firstLoad) {
      // window.magic = that.$contentEl;
      that.$contentEl.html(MyLocationsView.render().$el);
      that.firstLoad = false;
    } else {
      MyLocationsView.collection.fetch({success: function (response) {
        // console.log(MyLocationsView.collection);
        // that.$contentEl.html(MyLocationsView.render().$el);
        that.$contentEl.html(MyLocationsView.render().$el);
      }});
    }
    
    // console.log("rendering user locations");
    that.activeView = MyLocationsView;
  },

  recenterBySearch: function () {
    console.log("starting recenterBySearch method");
    // this method is triggered by a click in the head view
    var that = this;

    // unbinds events
    // http://stackoverflow.com/questions/6831362/backbone-js-view-cant-unbind-events-properly?rq=1
    if (that.activeView) { that.activeView.cancel(); }

    // generates its own collection from search phrase in $headEl, and renders
    var recenterResultsView = new DD.Views.RecenterResults(that.$headEl, that.$contentEl);
    recenterResultsView.render();
    console.log("recenter search method/view finished");

    that.activeView = recenterResultsView;
  },

  searchNearby: function () {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    var newLocationSearch = new DD.Views.LocationSearch(that.$contentEl);
    newLocationSearch.render();

    that.activeView = newLocationSearch;
  }
});