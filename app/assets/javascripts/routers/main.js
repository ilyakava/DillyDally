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

    // has a user, has her locations
    // render a view that accepts user model, and renders all locations
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
