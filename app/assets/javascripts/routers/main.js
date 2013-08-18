// in use
DD.Routers.Main = Backbone.Router.extend({
  initialize: function ($headEl, $contentEl, userData) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.userData = new DD.Models.User(userData);
    this.firstLoad = true;

  },

  // non-subroutes should be the only routes redirected to
  // from the nav bar
  routes: {
    "": "userCollections",
    "new-collection": "newCollection",
    "search-nearby": "searchNearby",
    "recenter-by-search": "recenterBySearch",

    "user-locations": "userLocations",
    "user-locations/location-details/:locId": "locationDetails",

    "user-friends": "userFriends",
    "user-friends/search-users": "searchUsers",

    "collection-locations/:colId": "collectionLocations"
  },

  userCollections: function () {
    // nav bar triggered view
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    // render head of searchbar (tabs and recenter searchbar)
    // Done here because the UserCollections view used is 
    // too generic and is reused later with a diff sidebar
    // set up inheritance later
    var userColHead = new DD.Views.UserCollectionsHead();
    this.$headEl.html(userColHead.render().$el);

    var MyCollectionsView = new DD.Views.UserCollections({
      model: that.userData
    });

    if (that.firstLoad) {
      that.$contentEl.html(MyCollectionsView.render().$el);
      that.firstLoad = false;
      // that.userSavedData = MyCollectionsView.collection;
      // markerManager.multiPolygon(that.userSavedData);
    } else {
      MyCollectionsView.model.fetch({
        success: function () {
          // that.userSavedData = MyCollectionsView.collection;
          that.$contentEl.html(MyCollectionsView.render().$el);
          // markerManager.multiPolygon(that.userSavedData);
        }
      });
    }
    that.activeView = MyCollectionsView;
  },

  newCollection: function () {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    var newCollectionView = new DD.Views.NewCollection({
      model: that.userData
    });

    that.$contentEl.html(newCollectionView.render().$el);

    that.activeView = newCollectionView;
  },

  userLocations: function () {
    // nav bar triggered view
    var that = this;

    // render head of searchbar (tabs and recenter searchbar)
    var searchbarHead = new DD.Views.LocationsHead();
    this.$headEl.html(searchbarHead.render().$el);

    // clear nearby search from map
    // markerManager.nearby();
    if (that.activeView) { that.activeView.cancel(); }

    var MyLocationsView = new DD.Views.UserLocations(
      that.userData,
      that.$headEl
    );
 
    MyLocationsView.collection.fetch({
      success: function (response) {
      
        that.$contentEl.html(MyLocationsView.render().$el);
      // that.$contentEl.prepend("<h3>" + that.pageName + "</h3>");
      // this.userSavedData = MyLocationsView.collection;
      // markerManager.myLocations(that.userSavedData);

    }});
    
    
    that.activeView = MyLocationsView;
    // has a user, has her locations
  },

  locationDetails: function (id) {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    that.userData.get("locations").get(id).fetch({
      url: "locations/" + id,
      success: function (model, response) {
        var locationDetailView = new DD.Views.LocationDetail(
          that.$headEl,
          that.$contentEl,
          new DD.Models.Location(response)
        );
        locationDetailView.render();
        that.activeView = locationDetailView;
      }
    });
  },

  userFriends: function () {
    // nav bar triggered view
    var that = this;
    // markerManager.myLocations();
    // markerManager.multiPolygon();


    
    if (that.activeView) { that.activeView.cancel(); }

    var MyFriendsView = new DD.Views.UserFriends(
      that.userData,
      that.$headEl
    );
 
    that.$contentEl.html(MyFriendsView.render().$el);
    
    // markerManager.myLocations(that.userSavedData);
    
    
    that.activeView = MyFriendsView;
  
    // has a user, has her friends
  },

  searchUsers: function () {
    var that = this;
    var userSearchView = new DD.Views.SearchUsers({
      model: that.userData
    });
    this.$contentEl.html(userSearchView.render().$el);
  },

  collectionLocations: function (collectionId) {
    // nav bar triggered view
    var that = this;

    if (that.activeView) { that.activeView.cancel(); }

    new DD.Models.Collection({id: collectionId}).fetch({
      success: function (model, response) {
        var collectionLocationsView = new DD.Views.CollectionLocations(
          new DD.Collections.Locations(response),
          that.$headEl
        );
        that.$contentEl.html(collectionLocationsView.render().$el);
        that.activeView = collectionLocationsView;
      }
    });
        // this.userSavedData = MyLocationsView.collection;
        // markerManager.myLocations(that.userSavedData);
      
    // has a collections, has its locations
    // render a view that accepts a collection model
  },

  searchNearby: function () {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    var locationSearchView = new DD.Views.LocationSearch(that.$contentEl, that.userSavedData);
    that.$contentEl.html(locationSearchView.render().$el);

    that.activeView = locationSearchView;
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

  
});
