DD.Views.LocationsHead = Backbone.View.extend({
  events: {
    "click button#recenter": "didYouMean"
  },

  didYouMean: function () {
    console.log("triggered didYouMean search method");
    Backbone.history.navigate("#/recenter-by-search");
  },

  render: function () {
    var renderedHead = JST['locations/head']();
    this.$el.html(renderedHead);
    return this;
  }
});