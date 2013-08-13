DD.Routers.Friends = Backbone.Router.extend({
  initialize: function ($headEl, $contentEl, friendsData) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;

    this.userSavedData = new DD.Collections.Users(friendsData);
    this.firstLoad = true;
    window.markerManager = new myMap.MarkerManager();
    
    // render head of searchbar (tabs and recenter searchbar)
    var searchbarHead = new DD.Views.FriendsHead();
    this.$headEl.html(searchbarHead.render().$el);
  },

  routes: {
    "" : "myFriends",
    // "recenter-by-search": "recenterBySearch",
    // "search-nearby": "searchNearby",
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

  myFriends: function () {
    var that = this;

    if (that.activeView) { that.activeView.cancel(); }

    var MyFriendsView = new DD.Views.MyFriends(that.userSavedData);
 
    if (that.firstLoad) {
      that.$contentEl.html(MyFriendsView.render().$el);
      that.firstLoad = false;
      this.userSavedData = MyFriendsView.collection;
      markerManager.myLocations(that.userSavedData);
    } else {
      MyFriendsView.collection.fetch({success: function (response) {
        that.$contentEl.html(MyFriendsView.render().$el);
        this.userSavedData = MyFriendsView.collection;
        markerManager.myLocations(that.userSavedData);
      }});
    }
    
    that.activeView = MyFriendsView;
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