DD.Routers.Locations = Backbone.Router.extend({
  initialize: function ($headEl, $contentEl) {
    this.$headEl = $headEl;
    this.$contentEl = $contentEl;
    
    // render head of searchbar (tabs and recenter searchbar)
    var searchbarHead = new DD.Views.LocationsHead();
    this.$headEl.html(searchbarHead.render().$el);
  },

  routes: {
    "" : "index",
    "recenter-by-search": "recenterBySearch"
  },

  index: function () {
    // should show your spots in data-list
  },

  recenterBySearch: function () {
    // triggered by a click in the head view
    // renders into data-list element
    var recenterResults = new DD.Views.RecenterResults();
    this.$contentEl.html(recenterResults.render().$el);
    console.log("recenter search method/view finished");
  }
});