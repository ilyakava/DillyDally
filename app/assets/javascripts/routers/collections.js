DD.Routers.Collections = Backbone.Router.extend({
  initialize: function ($headEl, $contentEl, collectionsData) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;

    this.userSavedData = new DD.Collections.Collections(collectionsData);
    this.firstLoad = true;
    window.markerManager = new myMap.MarkerManager();
    
    // render head of searchbar (tabs and recenter searchbar)
    var searchbarHead = new DD.Views.CollectionsHead();
    this.$headEl.html(searchbarHead.render().$el);
  },

  routes: {
    "" : "myCollections",
    "recenter-by-search": "recenterBySearch",
    "search-nearby": "searchNearby",
    "detail-view/:id": "collectionLocationList",
    "new-collection": "newCollection"
  },

  collectionLocationList: function (id) {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    var locationsInCollection = that.userSavedData.get(id).get("locations");

    var locationsListView = new DD.Views.MyLocations(
      locationsInCollection,
      that.$headEl
    );

    locationsListView.collection.fetch({success: function (response) {
      that.$contentEl.html(locationsListView.render().$el);
      // that.userSavedData = locationsListView.collection;
      // markerManager.myLocations(that.userSavedData);
    }});
    
    that.activeView = locationsListView;
  },

  myCollections: function () {
    var that = this;

    if (that.activeView) { that.activeView.cancel(); }

    var MyCollectionsView = new DD.Views.MyCollections({
      collection: that.userSavedData
    });
 
    if (that.firstLoad) {
      that.$contentEl.html(MyCollectionsView.render().$el);
      that.firstLoad = false;
      that.userSavedData = MyCollectionsView.collection;
      // markerManager.myLocations(that.userSavedData);
    } else {
      MyCollectionsView.collection.fetch({
        success: function () {
          that.userSavedData = MyCollectionsView.collection;
          that.$contentEl.html(MyCollectionsView.render().$el);
          // markerManager.myLocations(that.userSavedData);
        }
      });
    }
    
    that.activeView = MyCollectionsView;
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
  },

  newCollection: function () {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    var newCollectionView = new DD.Views.NewCollection(that.userSavedData);
    that.$contentEl.html(newCollectionView.render().$el);

    that.activeView = newCollectionView;
  }
});