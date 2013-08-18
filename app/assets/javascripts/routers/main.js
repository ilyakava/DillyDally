// in use
DD.Routers.Main = Backbone.Router.extend({
  initialize: function ($headEl, $contentEl, userData) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.userData = new DD.Models.User(userData);
    this.firstLoad = true;

  },

  routes: {
    "": "userCollections",
    "new-collection": "newCollection",
    "search-nearby": "searchNearby",
    "recenter-by-search": "recenterBySearch",

    "user-locations": "userLocations",
    "user-locations/location-details/:locId": "locationDetails",

    "user-friends": "userFriends",
    "user-friends/search-users": "searchUsers",
    "user-friends/:friendId/locations": "friendLocations",
    "user-friends/:friendId/collections": "friendCollections",

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

    var MyCollectionsView = new DD.Views.UserCollections(
      that.userData
    );

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
    that.navBarResetClass('collections');
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
      that.userData
    );
 
    MyLocationsView.collection.fetch({
      success: function (response) {
      
        that.$contentEl.html(MyLocationsView.render().$el);
      // that.$contentEl.prepend("<h3>" + that.pageName + "</h3>");
      // this.userSavedData = MyLocationsView.collection;
      // markerManager.myLocations(that.userSavedData);

    }});
    
    
    that.activeView = MyLocationsView;
    that.navBarResetClass('locations');
    // has a user, has her locations
  },

  locationDetails: function (id) {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }

    that.userData.get("locations").get(id).fetch({
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
    that.navBarResetClass('friends');
    // has a user, has her friends
  },

  searchUsers: function () {
    var that = this;
    var userSearchView = new DD.Views.SearchUsers({
      model: that.userData
    });
    this.$contentEl.html(userSearchView.render().$el);
  },

  friendLocations: function (friendId) {
    var that = this;

    if (that.activeView) { that.activeView.cancel(); }

    // get around parent id problem by including the user
    // in the locations fetch
    new DD.Models.User({id: friendId}).fetch({
      url: 'friends/' + friendId + '/locations',
      success: function (model, response) {
        var userLocationsView = new DD.Views.UserLocations(
          new DD.Collections.Users(response).first(),
          that.$headEl
        );
        that.$contentEl.html(userLocationsView.render().$el);
        that.activeView = userLocationsView;
      }
    });
  },

  friendCollections: function (friendId) {
    var that = this;

    if (that.activeView) { that.activeView.cancel(); }

    // get around parent id problem by including the user
    // in the locations fetch
    new DD.Models.User({id: friendId}).fetch({
      url: 'friends/' + friendId + '/collections',
      success: function (model, response) {
        var userCollectionsView = new DD.Views.UserCollections(
          new DD.Collections.Users(response).first(),
          that.$headEl
        );
        that.$contentEl.html(userCollectionsView.render().$el);
        that.activeView = userCollectionsView;
      }
    });
  },

  collectionLocations: function (collectionId) {
    // nav bar triggered view
    var that = this;

    if (that.activeView) { that.activeView.cancel(); }

    // get around parent id problem by including the collection
    // name in the url
    new DD.Models.Collection({id: collectionId}).fetch({
      success: function (model, response) {
        var collectionLocationsView = new DD.Views.CollectionLocations(
          new DD.Collections.Collections(response).first(),
          that.$headEl
        );
        that.$contentEl.html(collectionLocationsView.render().$el);
        that.activeView = collectionLocationsView;
      }
    });

    // has a collections, has its locations
    // render a view that accepts a collection model

    // emulates location details method
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

  navBarResetClass: function (newClass) {
    $('nav').
      find('ul.user>li').
      attr('class', newClass);
  },

  tabsResetClass: function (newClass) {
    $('#side-bar-navigation').
      find('ul.tabs>li').
      attr('class', newClass);
  }

  
});
