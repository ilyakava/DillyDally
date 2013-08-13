DD.Views.CollectionsHead = Backbone.View.extend({

  events: {
    "click button#recenter": "didYouMean"
  },

  didYouMean: function () {
    console.log("triggered map recenter search method");
    Backbone.history.navigate("#/redirecting");
    Backbone.history.navigate("#/recenter-by-search");
  },

  render: function () {
    var renderedHead = JST['collections/head']();
    this.$el.html(renderedHead);
    return this;
  }
});