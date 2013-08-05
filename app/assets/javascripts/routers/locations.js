DD.Routers.Locations = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
  },

  routes: {
    "" : "index"
  },

  index: function () {
    var basicView = new DD.Views.Locations();
    this.$rootEl.html(basicView.render().$el);
    console.log("index triggered");
    // render tabs
    // render basic view
  }
});