DD.Routers.Locations = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
  },

  routes: {
    "" : "index"
  },

  index: function () {
    // render tabs and map-center search bar
    var basicView = new DD.Views.Locations();
    this.$rootEl.html(basicView.render().$el);
    console.log("index triggered");
  }
});