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
    // "my-followers": "myFollowers",
    "users-locations-list/:id": "usersLocationsList",
    "users-collections-list/:id": "usersCollectionsList",
    "detail-view/:id": "collectionsLocationsList",
    "search-users": "searchUsers"
  },

  searchUsers: function () {
    var that = this;
    var userSearchView = new DD.Views.SearchUsers({
      collection: that.userSavedData
    });
    this.$contentEl.html(userSearchView.render().$el);
  },

  collectionsLocationsList: function (id) {
    var that = this;
    markerManager.myLocations();
    markerManager.multiPolygon();
    if (that.activeView) { that.activeView.cancel(); }
    
    var locations = that.userSavedData.select(function (user) {
      return !!user.get("collections").get(id);
    })[0].get("collections").get(id).get("locations");
    console.log("locations");
    console.log(locations);

    var usersLocationsView = new DD.Views.UsersLocationsList(
      locations,
      that.$headEl
    );

    that.$contentEl.html(usersLocationsView.render().$el);
    markerManager.multiPolygon(locations);
    
    that.activeView = usersLocationsView;
  },

  detailView: function (id) {
    // TODO
    // var that = this;
    // if (that.activeView) { that.activeView.cancel(); }

    // var model = that.userSavedData.get(id);

    // var locationDetailView = new DD.Views.LocationDetail(that.$headEl, that.$contentEl, model);
    // locationDetailView.render();

    // that.activeView = locationDetailView;
  },

  usersLocationsList: function (id) {
    var that = this;
    markerManager.multiPolygon();

    if (that.activeView) { that.activeView.cancel(); }
    
    var locations = this.userSavedData.get(id).get("locations");

    var usersLocationsView = new DD.Views.UsersLocationsList(
      locations,
      that.$headEl
    );

    that.$contentEl.html(usersLocationsView.render().$el);
    markerManager.myLocations(locations);
    that.activeView = usersLocationsView;
  },

  usersCollectionsList: function (id) {
    var that = this;
    markerManager.myLocations();
    markerManager.multiPolygon();

    if (that.activeView) { that.activeView.cancel(); }

    var locations = this.userSavedData.get(id).get("collections");

    var usersCollectionsView = new DD.Views.UsersCollectionsList(
      locations,
      that.$headEl
    );

    that.$contentEl.html(usersCollectionsView.render().$el);
    markerManager.multiPolygon(locations);
    
    that.activeView = usersCollectionsView;
  },

  myFriends: function () {
    var that = this;
    markerManager.myLocations();
    markerManager.multiPolygon();
    
    if (that.activeView) { that.activeView.cancel(); }

    var MyFriendsView = new DD.Views.ListUsers({
      collection: that.userSavedData
    });
 
    if (that.firstLoad) {
      that.$contentEl.html(MyFriendsView.render().$el);
      that.firstLoad = false;
      this.userSavedData = MyFriendsView.collection;
      // markerManager.myLocations(that.userSavedData);
    } else {
      MyFriendsView.collection.fetch({success: function (response) {
        that.$contentEl.html(MyFriendsView.render().$el);
        this.userSavedData = MyFriendsView.collection;
        // markerManager.myLocations(that.userSavedData);
      }});
    }
    
    that.activeView = MyFriendsView;
  }
});