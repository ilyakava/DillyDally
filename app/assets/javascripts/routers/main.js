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
    // "search-nearby": "searchNearby",
    // "user-collections/recenter-by-search": "recenterBySearch",

    "user-locations": "userLocations",
    "user-locations/location-details/:locId": "locationDetails",

    "user-friends": "userFriends",
    "collection-locations/:colId": "collectionLocations"
  },

  userCollections: function () {
    // nav bar triggered view
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    // render head of searchbar (tabs and recenter searchbar)
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
    // clear nearby search from map
    // markerManager.nearby();
    if (that.activeView) { that.activeView.cancel(); }

    var MyLocationsView = new DD.Views.UserLocations(
      that.userData,
      that.$headEl
    );
 
    if (that.firstLoad) {
      that.$contentEl.html(MyLocationsView.render().$el);
      // that.$contentEl.prepend("<h3>" + that.pageName + "</h3>");
      that.firstLoad = false;
      // this.userSavedData = MyLocationsView.collection;
      // markerManager.myLocations(that.userSavedData);
      
    } else {
      MyLocationsView.collection.fetch({success: function (response) {
        that.$contentEl.html(MyLocationsView.render().$el);
        // that.$contentEl.prepend("<h3>" + that.pageName + "</h3>");
        // this.userSavedData = MyLocationsView.collection;
        // markerManager.myLocations(that.userSavedData);

      }});
    }
    
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

    // has a user, has her friends
    // render a view that accepts user model, and resnders all friends
  },

  collectionsLocations: function () {
    // nav bar triggered view

    // has a collections, has its locations
    // render a view that accepts a collection model
  }
});
