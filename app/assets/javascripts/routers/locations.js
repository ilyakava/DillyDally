DD.Routers.Locations = Backbone.Router.extend({
  initialize: function ($headEl, $contentEl, locationsData) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;

    this.userSavedData = new DD.Collections.Locations(locationsData);
    this.firstLoad = true;
    window.markerManager = new myMap.MarkerManager();
    
    // render head of searchbar (tabs and recenter searchbar)
    var searchbarHead = new DD.Views.LocationsHead();
    this.$headEl.html(searchbarHead.render().$el);
  },

  routes: {
    "" : "myLocations",
    "recenter-by-search": "recenterBySearch",
    "search-nearby": "searchNearby",
    "detail-view/:id": "detailView"
  },

  detailView: function (id) {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    var model = that.userSavedData.get(id);

    var locationDetailView = new DD.Views.LocationDetail(that.$headEl, that.$contentEl, model);
    locationDetailView.render();

    that.activeView = locationDetailView;
  },

  myLocations: function () {
    var that = this;

    if (that.activeView) { that.activeView.cancel(); }

    var MyLocationsView = new DD.Views.MyLocations(that.userSavedData);
 
    if (that.firstLoad) {
      that.$contentEl.html(MyLocationsView.render().$el);
      that.firstLoad = false;
      this.userSavedData = MyLocationsView.collection;
      markerManager.myLocations(that.userSavedData);
    } else {
      MyLocationsView.collection.fetch({success: function (response) {
        that.$contentEl.html(MyLocationsView.render().$el);
        this.userSavedData = MyLocationsView.collection;
        markerManager.myLocations(that.userSavedData);
      }});
    }
    
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

    var locationSearchView = new DD.Views.LocationSearch(that.$contentEl, that.userSavedData);
    that.$contentEl.html(locationSearchView.render().$el);

    that.activeView = locationSearchView;
  }
});