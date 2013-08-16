DD.Routers.Main = Backbone.Router.extend({
  initialize: function ($headEl, $contentEl, userData) {
    that.$headEl = $headEl;
    that.$contentEl = $contentEl;
    that.userData = userData;
    // parse data first
  },

  routes: {
    "": "userCollections",
    "user-locations": "userLocations",
    "user-friends": "userFriends",
    "collection-locations/:collectionId": "collectionLocations"
  },

  userCollections: function () {
    // has a user, has her collections
    // render a view that accepts a user model, and renders collections
  },

  userLocations: function () {
    // has a user, has her locations
    // render a view that accepts user model, and renders all locations
  },

  userFriends: function () {
    // has a user, has her friends
    // render a view that accepts user model, and resnders all friends
  },

  collectionsLocations: function () {
    // has a collections, has its locations
    // render a view that accepts a collection model
  }
});
