// in use
DD.Routers.Main = Backbone.Router.extend({
  initialize: function ($headEl, $contentEl, userData) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    this.userData = new DD.Models.User(userData);
    this.firstLoad = true;

    window.markerManager = new myMap.MarkerManager();

  },

  routes: {
    "": "userCollections",
    "new-collection": "newCollection",
    "search-nearby": "searchNearby",
    "recenter-by-search": "recenterBySearch",

    "user-locations": "userLocations",
    "user-locations/location-details/:locId": "locationDetails",

    // "collection-details/:colId": "collectionDetails",

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
    markerManager.reset();

    // render head of searchbar (tabs and recenter searchbar)
    // Done here because the UserCollections view used is 
    // too generic and is reused later with a diff sidebar
    // set up inheritance later
    var userColHead = new DD.Views.UserCollectionsHead();
    this.$headEl.html(userColHead.render().$el);


    if (that.firstLoad) {
      var MyCollectionsView = new DD.Views.UserCollections(
        that.userData
      );
      that.$contentEl.html(MyCollectionsView.render().$el);
      that.firstLoad = false;
    } else {
      that.userData.fetch({
        success: function (model, response) {
          var MyCollectionsView = new DD.Views.UserCollections(
            model
          );
          that.$contentEl.html(MyCollectionsView.render().$el);
        }
      });
    }
    that.activeView = MyCollectionsView;
    that.navBarResetClass('collections');
    that.tabsResetClass('index');
  },

  newCollection: function () {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }
    markerManager.reset();

    var newCollectionView = new DD.Views.NewCollection({
      model: that.userData
    });

    that.$contentEl.html(newCollectionView.render().$el);

    that.activeView = newCollectionView;
    that.tabsResetClass('new-collection');
  },

  userLocations: function () {
    // nav bar triggered view
    var that = this;
    // clear nearby search from map
    // markerManager.nearby();
    if (that.activeView) { that.activeView.cancel(); }
    markerManager.reset();

    // render head of searchbar (tabs and recenter searchbar)
    var searchbarHead = new DD.Views.LocationsHead();
    this.$headEl.html(searchbarHead.render().$el);


    var MyLocationsView = new DD.Views.UserLocations(
      that.userData
    );
 
    MyLocationsView.collection.fetch({
      wait: true,
      success: function (response) {
      
        that.$contentEl.html(MyLocationsView.render().$el);
      // that.$contentEl.prepend("<h3>" + that.pageName + "</h3>");
      // this.userSavedData = MyLocationsView.collection;
        markerManager.myLocations(MyLocationsView.collection);

    }});
    
    
    that.activeView = MyLocationsView;
    that.navBarResetClass('locations');
    that.tabsResetClass('index');
    // has a user, has her locations
  },

  locationDetails: function (id) {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }
    markerManager.reset();

    that.userData.get("locations").get(id).fetch({
      success: function (model, response) {
        var locationDetailView = new DD.Views.LocationDetail(
          that.$headEl,
          that.$contentEl,
          new DD.Models.Location(response)
        );
        locationDetailView.render();
        that.activeView = locationDetailView;
        that.tabsResetClass('location-details');
        markerManager.mapCenter(locationDetailView.model);
      }
    });
  },

  userFriends: function () {
    // nav bar triggered view
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }
    markerManager.reset();

    // render head of searchbar (tabs and recenter searchbar)
    var searchbarHead = new DD.Views.FriendsHead();
    this.$headEl.html(searchbarHead.render().$el);
    

    var MyFriendsView = new DD.Views.UserFriends(
      that.userData,
      that.$headEl
    );
 
    that.$contentEl.html(MyFriendsView.render().$el);
    
    // markerManager.myLocations(that.userSavedData);
    
    
    that.activeView = MyFriendsView;
    that.navBarResetClass('friends');
    that.tabsResetClass('index');
    // has a user, has her friends
  },

  searchUsers: function () {
    var that = this;
    var userSearchView = new DD.Views.SearchUsers({
      model: that.userData
    });
    this.$contentEl.html(userSearchView.render().$el);
    that.tabsResetClass('search-users');
  },

  friendLocations: function (friendId) {
    var that = this;

    if (that.activeView) { that.activeView.cancel(); }
    markerManager.reset();


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
        that.tabsResetClass('friends-locations');
        markerManager.myLocations(userLocationsView.collection);
      }
    });
  },

  friendCollections: function (friendId) {
    var that = this;

    if (that.activeView) { that.activeView.cancel(); }
    markerManager.reset();


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
        that.tabsResetClass('friends-collections');
      }
    });
  },

  collectionLocations: function (collectionId) {
    // nav bar triggered view
    var that = this;

    if (that.activeView) { that.activeView.cancel(); }
    markerManager.reset();


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
        that.tabsResetClass('collection-locations');
        markerManager.myLocations(collectionLocationsView.collection);
      }
    });

    // has a collections, has its locations
    // render a view that accepts a collection model
    // emulates location details method
  },

  searchNearby: function () {
    var that = this;
    if (that.activeView) { that.activeView.cancel(); }
    

    var locationSearchView = new DD.Views.LocationSearch(
      that.$contentEl,
      that.userData.get("locations")
    );
    that.$contentEl.html(locationSearchView.render().$el);

    that.activeView = locationSearchView;
    that.tabsResetClass('search-nearby');
    markerManager.myLocations(locationSearchView.collection);
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

    that.tabsResetClass('did-you-mean');
    that.activeView = recenterResultsView;
  },

  navBarResetClass: function (newClass) {
    // close the mobile menu
    if ($('#mobile-menu-expansion').is(':visible')) { $('nav > ul.user').hide() }
    $('nav').
      find('ul.user>li').
      attr('class', newClass);
  },

  tabsResetClass: function (newClass) {
    $('#side-bar-navigation').
      find('ul.tabs>li>a').
      attr('class', newClass);
  }

  
});
